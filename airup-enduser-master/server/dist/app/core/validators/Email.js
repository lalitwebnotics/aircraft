"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.EMAIL_REGEX = void 0;var _Validator = _interopRequireDefault(require("../../../modules/Validator"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Email validator
 */exports.EMAIL_REGEX = EMAIL_REGEX;
class Email extends _Validator.default {

  /**
   * Get message
   */
  getMessage() {
    return 'Invalid email address';
  }

  /**
   * Validate
   */
  validate(value = '') {
    if (!value || EMAIL_REGEX.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  }}exports.default = Email;