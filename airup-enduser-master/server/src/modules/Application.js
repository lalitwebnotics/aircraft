import { extend, forEach, get, isArray, isFunction, isString, isUndefined, keys, sortBy, uniq } from 'lodash';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs-extra';
import mongoose, { Schema } from 'mongoose'
import mustache from 'mustache';
import fileUpload from 'express-fileupload';

import { bind, queue, permalink } from './utils';
import Controller from './Controller';
import Request from './Request';
import startCron from './cron'


import BulkDataImporter from './BulkDataImporter'
import csv from 'csv-parser';
import fileSystem from 'fs';
import nocache from 'nocache'
import {join} from "path";
// import { permalink } from '../../../modules/utils';

export const HTTP_METHODS = [
  'delete',
  'get',
  'post',
  'put'
];

/**
 * Application
 */
export default class Application {

  constructor(config = {}) {
    this.config = config;
    this.dependencies = {
      controllers: {},
      mailers: {},
      middleware: {},
      models: {},
      routes: [],
      templates: {},
      validators: {}
    };
    this.express = express();
    this.mongoose = null;
    this.server = null;
    bind(this);
  }

  /**
   * Host
   */
  get host() {
    return this.config.host || '0.0.0.0';
  }

  /**
   * Port
   */
  get port() {
    return this.config.port || '8000';
  }

  /**
   * Close server
   */
  close() {
    return queue([
      /**
       * Close server
       */
      () => new Promise((resolve) => {
        if (this.server) {
          this.server.close(() => {
            resolve(this);
          });
        } else {
          resolve(this);
        }
      }),
      /**
       * Close database
       */
      () => new Promise((resolve) => {
        if (this.mongoose) {
          this.mongoose.close(() => {
            resolve(this);
          });
        } else {
          resolve(this);
        }
      })
    ]);
  }

  /**
   * Connect database
   */
  connect() {
    const { url, options } = this.config.database.mongodb;
    return queue([
      /**
       * Connect to mongodb
       */
      () => mongoose.connect(url, options).then((connection) => {
        console.log('connected to database');
        return this.mongoose = connection;
      }),
      /**
       * Register models
       */
      () => {
        forEach(this.dependencies.models, (Model, name) => {
          if (Model instanceof Schema) {
            this.dependencies.models[name] = mongoose.model(name, Model);
          }
        });
      }
    ])
  }

  /**
   * Load controllers
   */
  controllers(controllers) {
    extend(this.dependencies.controllers, parse(this, controllers));
    return this;

    /**
     * Recursive function to parse controllers
     */
    function parse(self, raw) {
      forEach(raw, (Child, key) => {
        if (isFunction(Child)) {
          raw[key] = new Child(self);
        } else {
          parse(self, Child);
        }
      });
      return raw;
    }
  }

  /**
   * Get controller
   */
  getController(name) {
    return get(this.dependencies.controllers, name);
  }

  /**
   * Get mailer
   */
  getMailer(name) {
    return get(this.dependencies.mailers, name);
  }

  /**
   * Get model
   */
  getModel(name) {
    return get(this.dependencies.models, name);
  }

  /**
   * Get sorted routes
   */
  getRoutes() {
    return sortBy(this.dependencies.routes, 'priority');
  }

  /**
   * Get template
   */
  getTemplate(name) {
    return get(this.dependencies.templates, name);
  }

  /**
   * Get validator
   */
  getValidator(name) {
    return get(this.dependencies.validators, name);
  }

  /**
   * Send email
   */
  mail(options, mailer) {
    options = options || {};
    if (isUndefined(mailer)) {
      mailer = keys(this.dependencies.mailers)[0];
    }
    mailer = this.getMailer(mailer);
    if (!mailer) {
      throw new Error('Missing mailer');
    }
    if (isUndefined(options.sender)) {
      options.sender = this.config.mail.sender;
    }
    if (isString(options.sender)) {
      options.sender = {
        email: options.sender
      };
    }
    if (!isArray(options.recipients)) {
      throw new Error('Recipients option is required and must be an array');
    }
    options.recipients = options.recipients.map((recipient) => {
      return isString(recipient) ? { email: recipient } : recipient;
    });
    if (!isString(options.subject)) {
      throw new Error('Subject is required and must be a string');
    }
    if (isUndefined(options.message)) {
      if (isUndefined(options.template)) {
        throw new Error('Template is required when message is missing');
      }
      const template = isString(options.template) ? this.getTemplate(options.template) : options.template;
      if (isString(template)) {
        options.message = {
          text: mustache.render(template, options.data || {})
        };
      } else {
        options.message = {
          html: mustache.render(template.html || '', options.data || {}),
          text: mustache.render(template.text || '', options.data || {})
        };
      }
    }
    return mailer.send(options);
  }

  /**
   * Mailers
   */
  mailers(mailers) {
    forEach(mailers, (Mailer, name) => {
      mailers[name] = new Mailer(this, name);
    });
    this.dependencies.mailers = mailers;
    return this;
  }

  /**
   * Middleware
   */
  middleware(middleware) {
    this.dependencies.middleware = middleware;
    return this;
  }

  /**
   * Models
   */
  models(models) {
    this.dependencies.models = models;
    return this;
  }

  /**
   * Load routes
   */
  routes(routes) {
    return parse(this, routes);

    /**
     * Recursive function to parse routes
     */
    function parse(self, raw, inherit = {}) {
      forEach(raw, (child, key) => {
        if (key.charAt(0) === '/') {
          const controller = self.getController(child.controller) || inherit.controller,
                endpoint = (inherit.endpoint || '') + key,
                middleware = uniq([
                  ...(inherit.middleware || []),
                  ...(child.middleware || [])
                ]),
                priority = child.priority || inherit.priority || 10;
          if (!isUndefined(controller)) {
            HTTP_METHODS.forEach((method) => {
              if (!isUndefined(child[method]) || !isUndefined(child.all)) {
                const route = child[method] || child.all,
                      action = route.action || route,
                      wares = uniq([
                        ...middleware,
                        ...(route.middleware || [])
                      ]),
                      callback = get(controller, action);
                self.dependencies.routes.push({
                  callback,
                  endpoint,
                  method,
                  middleware: wares,
                  priority
                });
              }
            });
          }
          parse(self, child, extend({}, inherit, {
            controller,
            endpoint,
            middleware,
            priority
          }))
        }
      });
      return self;
    }
  }

  /**
   * Start server
   */
  start() {
    this.express.use(bodyParser.json());
    this.express.use(cors(this.config.cors));
    this.express.use(fileUpload());

    this.express.use(nocache())


    console.log('build path', join(__dirname, '../../../client/build/'));

    // Register routes
    this.getRoutes().forEach((route) => {
      this.express[route.method](route.endpoint, (req, res, next) => {
        return new Request(this, route, { req, res, next }).call();
      });
    });

    this.express.use('/', express.static(join(__dirname, '../../../client/build/')));
    this.express.use('/*', express.static(join(__dirname, '../../../client/build/')));


    return this.close().then(() => {
      return queue([
        /**
         * Initialize mailers
         */
        () => Promise.all(keys(this.dependencies.mailers).map((name) =>
          this.getMailer(name).init()
        )),
        /**
         * Initialize conrollers
         */
        () => {
          const promises = [];
          recurse(this.dependencies.controllers);
          return Promise.all(promises);

          /**
           * Recurse to all defined controllers
           */
          function recurse(controllers) {
            forEach(controllers, (controller) => {
              if (controller instanceof Controller) {
                promises.push(controller.init());
              } else {
                recurse(controller);
              }
            });
          }
        },
        /**
         * Connect database
         */
        () => this.connect(),
        /**
         * Start server
         */
        () => new Promise((resolve, reject) => {
          this.express.listen(this.port, this.host, (err) => {
            if (err) {
              reject(err);
            } else {
              console.log('Server Running on port '+ this.port);
              resolve(this);
            }
          });
        }),
      ]);
    });
  }

  /**
   * Templates
   */
  templates(templates) {
    this.dependencies.templates = parse(templates);
    return this;

    /**
     * Parse files
     */
    function parse(object) {
      forEach(object, (data, key) => {
        if (isString(data)) {
          object[key] = fs.readFileSync(data, 'utf-8');
        } else {
          object[key] = parse(data);
        }
      });
      return object;
    }
  }

  /**
   * Validators
   */
  validators(validators) {
    forEach(validators, (Validator, name) => {
      this.dependencies.validators[name] = new Validator(this);
    });
    return this;
  }

  async startCron(sendAll = false){
    startCron(this, sendAll);
  }

  //execute data-entry process
  async bulkReadFromCsv(){
    //import data from csv

    let importerObject = new BulkDataImporter();

    importerObject.executeImport(this);

    // uploaderObject.startProductsImport(this);
    // uploaderObject.startCertificatesImport(this);

  }


}
