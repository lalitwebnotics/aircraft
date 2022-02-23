"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _lodash = require("lodash");

/**
 * Validator
 */
class Validator {

  constructor(app) {
    this.app = app;
  }

  /**
   * Parse rule
   */
  static parse(rule) {
    if ((0, _lodash.isString)(rule)) {
      const colon = rule.indexOf(':'),
      name = colon < 0 ? rule : rule.substring(0, colon),
      after = colon < 0 ? '' : rule.substring(colon + 1),
      options = after ? after.split(',') : [];
      return {
        name,
        options };

    } else {
      return rule;
    }
  }

  /**
   * Use validator
   */
  use(initial, input) {
    const rule = {
      ...initial,
      input,
      validator: this };

    return (value) => {
      return this.validate(value, rule).catch(() => {
        return Promise.reject((() => {
          if ((0, _lodash.isFunction)(rule.message)) {
            return rule.message(rule, value);
          } else if ((0, _lodash.isString)(rule.message)) {
            return rule.message;
          } else if ((0, _lodash.isFunction)(this.getMessage)) {
            return this.getMessage(rule, value);
          } else {
            return 'Validation failed for ' + snakeCase(input).replace(/\_/g, ' ');
          }
        })());
      });
    };
  }

  /**
   * Must implement validate
   */
  validate() {
    throw new Error('This method must implement a `validate` function');
  }}exports.default = Validator;