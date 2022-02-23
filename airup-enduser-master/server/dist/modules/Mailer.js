"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = require("./utils");

/**
 * Mailer class
 */
class Mailer {

  constructor(app, name) {
    this.app = app;
    this.config = this.app.config.mail.providers[name] || {};
    (0, _utils.bind)(this);
  }

  /**
   * Initialize
   */
  init() {
    throw new Error('This method must implement a mailer configuration');
  }

  /**
   * Send mail
   */
  send() {
    throw new Error('This method must implement a `send` function');
  }}exports.default = Mailer;