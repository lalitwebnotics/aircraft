"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _lodash = require("lodash");

/**
 * Exception
 */
class Exception {

  static reject(message, code, status) {
    return Promise.reject(new this(message, code, status));
  }

  constructor(message, code, status) {
    this.code = code;
    this.message = message;
    this.status = (0, _lodash.isUndefined)(status) ? this.code : status;
  }}exports.default = Exception;