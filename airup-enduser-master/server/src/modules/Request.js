import { isUndefined } from 'lodash';

import { bind, queue } from './utils';
import Exception from './Exception';

export const DEFAULT_STATUS_CODE = 500;
export const UNKNOWN_EXCEPTION = 'Unknown exception';
export const UNKNOWN_MIDDLEWARE = 'Unknown middleware';

/**
 * Request
 */
export default class Request {

  constructor(app, route, args) {
    this.app = app;
    this.attachments = {};
    this.route = route;
    this.args = args;
    bind(this);
  }

  /**
   * Body
   */
  get body() {
    return this.req.body || {};
  }

  /**
   * Parameters
   */
  get params() {
    return this.req.params;
  }

  /**
   * Query
   */
  get query() {
    return this.req.query;
  }

  /**
   * Get req
   */
  get req() {
    return this.args.req;
  }

  /**
   * Get res
   */
  get res() {
    return this.args.res;
  }

  /**
   * Attach
   */
  attach(attachments = {}) {
    this.attachments = {
      ...this.attachments,
      ...attachments
    };
    return this;
  }

  /**
   * Get attachment
   */
  attachment(name) {
    return this.attachments[name];
  }

  /**
   * Call request
   */
  call() {
    return queue([
      ...this.route.middleware.map((value = '') => {
        const colon = value.indexOf(':'),
              index = (colon < 0) ? value.length : colon,
              name = value.substring(0, index),
              args = value.substring(index + 1),
              middleware = this.app.dependencies.middleware[name];
        if (isUndefined(middleware)) {
          return Exception.reject(UNKNOWN_MIDDLEWARE);
        }
        return middleware(...(args.length ? args.split(',') : []));
      }),
      this.route.callback
    ].map((callback) => (
      () => Promise.resolve(callback(this))
    ))).then((response) => {
      return this.send(response);
    }).catch((err) => {
      return this.error(err);
    });
  }

  /**
   * Pass data for continuity purposes
   */
  data(data) {
    return data;
  }

  /**
   * Send error
   */
  error(err = {}) {
    const code = err.code || err.status || DEFAULT_STATUS_CODE,
          message = err.message || err || UNKNOWN_EXCEPTION;
    this.status(err.status || DEFAULT_STATUS_CODE).send({
      error: {
        code,
        message
      }
    });
    return this;
  }

  /**
   * Get header
   */
  header(name, value) {
    if (isUndefined(value)) {
      return this.req.header(name);
    } else {
      this.res.header(name, value);
      return this;
    }
  }

  /**
   * Call next
   */
  next() {
    this.args.next();
    return this;
  }

  /**
   * Send data
   */
  send(data) {
    if (data !== undefined && data !== null && !this.res.finished) {
      this.res.json(data);
    }
    return this;
  }

  /**
   * Set status
   */
  status(code) {
    this.res.status(code);
    return this;
  }
}
