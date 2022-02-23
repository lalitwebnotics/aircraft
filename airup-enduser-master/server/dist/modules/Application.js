"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.HTTP_METHODS = void 0;var _lodash = require("lodash");
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _mongoose = _interopRequireWildcard(require("mongoose"));
var _mustache = _interopRequireDefault(require("mustache"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _utils = require("./utils");
var _Controller = _interopRequireDefault(require("./Controller"));
var _Request = _interopRequireDefault(require("./Request"));
var _cron = _interopRequireDefault(require("./cron"));


var _BulkDataImporter = _interopRequireDefault(require("./BulkDataImporter"));
var _csvParser = _interopRequireDefault(require("csv-parser"));
var _fs = _interopRequireDefault(require("fs"));
var _nocache = _interopRequireDefault(require("nocache"));
var _path = require("path");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// import { permalink } from '../../../modules/utils';

const HTTP_METHODS = [
'delete',
'get',
'post',
'put'];


/**
 * Application
 */exports.HTTP_METHODS = HTTP_METHODS;
class Application {

  constructor(config = {}) {
    this.config = config;
    this.dependencies = {
      controllers: {},
      mailers: {},
      middleware: {},
      models: {},
      routes: [],
      templates: {},
      validators: {} };

    this.express = (0, _express.default)();
    this.mongoose = null;
    this.server = null;
    (0, _utils.bind)(this);
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
    return (0, _utils.queue)([
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
    })]);

  }

  /**
   * Connect database
   */
  connect() {
    const { url, options } = this.config.database.mongodb;
    return (0, _utils.queue)([
    /**
     * Connect to mongodb
     */
    () => _mongoose.default.connect(url, options).then((connection) => {
      console.log('connected to database');
      return this.mongoose = connection;
    }),
    /**
     * Register models
     */
    () => {
      (0, _lodash.forEach)(this.dependencies.models, (Model, name) => {
        if (Model instanceof _mongoose.Schema) {
          this.dependencies.models[name] = _mongoose.default.model(name, Model);
        }
      });
    }]);

  }

  /**
   * Load controllers
   */
  controllers(controllers) {
    (0, _lodash.extend)(this.dependencies.controllers, parse(this, controllers));
    return this;

    /**
     * Recursive function to parse controllers
     */
    function parse(self, raw) {
      (0, _lodash.forEach)(raw, (Child, key) => {
        if ((0, _lodash.isFunction)(Child)) {
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
    return (0, _lodash.get)(this.dependencies.controllers, name);
  }

  /**
   * Get mailer
   */
  getMailer(name) {
    return (0, _lodash.get)(this.dependencies.mailers, name);
  }

  /**
   * Get model
   */
  getModel(name) {
    return (0, _lodash.get)(this.dependencies.models, name);
  }

  /**
   * Get sorted routes
   */
  getRoutes() {
    return (0, _lodash.sortBy)(this.dependencies.routes, 'priority');
  }

  /**
   * Get template
   */
  getTemplate(name) {
    return (0, _lodash.get)(this.dependencies.templates, name);
  }

  /**
   * Get validator
   */
  getValidator(name) {
    return (0, _lodash.get)(this.dependencies.validators, name);
  }

  /**
   * Send email
   */
  mail(options, mailer) {
    options = options || {};
    if ((0, _lodash.isUndefined)(mailer)) {
      mailer = (0, _lodash.keys)(this.dependencies.mailers)[0];
    }
    mailer = this.getMailer(mailer);
    if (!mailer) {
      throw new Error('Missing mailer');
    }
    if ((0, _lodash.isUndefined)(options.sender)) {
      options.sender = this.config.mail.sender;
    }
    if ((0, _lodash.isString)(options.sender)) {
      options.sender = {
        email: options.sender };

    }
    if (!(0, _lodash.isArray)(options.recipients)) {
      throw new Error('Recipients option is required and must be an array');
    }
    options.recipients = options.recipients.map((recipient) => {
      return (0, _lodash.isString)(recipient) ? { email: recipient } : recipient;
    });
    if (!(0, _lodash.isString)(options.subject)) {
      throw new Error('Subject is required and must be a string');
    }
    if ((0, _lodash.isUndefined)(options.message)) {
      if ((0, _lodash.isUndefined)(options.template)) {
        throw new Error('Template is required when message is missing');
      }
      const template = (0, _lodash.isString)(options.template) ? this.getTemplate(options.template) : options.template;
      if ((0, _lodash.isString)(template)) {
        options.message = {
          text: _mustache.default.render(template, options.data || {}) };

      } else {
        options.message = {
          html: _mustache.default.render(template.html || '', options.data || {}),
          text: _mustache.default.render(template.text || '', options.data || {}) };

      }
    }
    return mailer.send(options);
  }

  /**
   * Mailers
   */
  mailers(mailers) {
    (0, _lodash.forEach)(mailers, (Mailer, name) => {
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
      (0, _lodash.forEach)(raw, (child, key) => {
        if (key.charAt(0) === '/') {
          const controller = self.getController(child.controller) || inherit.controller,
          endpoint = (inherit.endpoint || '') + key,
          middleware = (0, _lodash.uniq)([
          ...(inherit.middleware || []),
          ...(child.middleware || [])]),

          priority = child.priority || inherit.priority || 10;
          if (!(0, _lodash.isUndefined)(controller)) {
            HTTP_METHODS.forEach((method) => {
              if (!(0, _lodash.isUndefined)(child[method]) || !(0, _lodash.isUndefined)(child.all)) {
                const route = child[method] || child.all,
                action = route.action || route,
                wares = (0, _lodash.uniq)([
                ...middleware,
                ...(route.middleware || [])]),

                callback = (0, _lodash.get)(controller, action);
                self.dependencies.routes.push({
                  callback,
                  endpoint,
                  method,
                  middleware: wares,
                  priority });

              }
            });
          }
          parse(self, child, (0, _lodash.extend)({}, inherit, {
            controller,
            endpoint,
            middleware,
            priority }));

        }
      });
      return self;
    }
  }

  /**
   * Start server
   */
  start() {
    this.express.use(_bodyParser.default.json());
    this.express.use((0, _cors.default)(this.config.cors));
    this.express.use((0, _expressFileupload.default)());

    this.express.use((0, _nocache.default)());


    console.log('build path', (0, _path.join)(__dirname, '../../../client/build/'));

    // Register routes
    this.getRoutes().forEach((route) => {
      this.express[route.method](route.endpoint, (req, res, next) => {
        return new _Request.default(this, route, { req, res, next }).call();
      });
    });

    this.express.use('/', _express.default.static((0, _path.join)(__dirname, '../../../client/build/')));
    this.express.use('/*', _express.default.static((0, _path.join)(__dirname, '../../../client/build/')));


    return this.close().then(() => {
      return (0, _utils.queue)([
      /**
       * Initialize mailers
       */
      () => Promise.all((0, _lodash.keys)(this.dependencies.mailers).map((name) =>
      this.getMailer(name).init())),

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
          (0, _lodash.forEach)(controllers, (controller) => {
            if (controller instanceof _Controller.default) {
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
            console.log('Server Running on port ' + this.port);
            resolve(this);
          }
        });
      })]);

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
      (0, _lodash.forEach)(object, (data, key) => {
        if ((0, _lodash.isString)(data)) {
          object[key] = _fsExtra.default.readFileSync(data, 'utf-8');
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
    (0, _lodash.forEach)(validators, (Validator, name) => {
      this.dependencies.validators[name] = new Validator(this);
    });
    return this;
  }

  async startCron(sendAll = false) {
    (0, _cron.default)(this, sendAll);
  }

  //execute data-entry process
  async bulkReadFromCsv() {
    //import data from csv

    let importerObject = new _BulkDataImporter.default();

    importerObject.executeImport(this);

    // uploaderObject.startProductsImport(this);
    // uploaderObject.startCertificatesImport(this);

  }}exports.default = Application;