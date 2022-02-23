"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.PASSWORD_REGEX = exports.PASSWORD_MIN_LENGTH = exports.PASSWORD_MAX_LENGTH = void 0;var _Validator = _interopRequireDefault(require("../../../modules/Validator"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const PASSWORD_REGEX = /^(?!.*[\s])/;exports.PASSWORD_REGEX = PASSWORD_REGEX;
const PASSWORD_MIN_LENGTH = 6;exports.PASSWORD_MIN_LENGTH = PASSWORD_MIN_LENGTH;
const PASSWORD_MAX_LENGTH = 20;

/**
 * Password validator
 */exports.PASSWORD_MAX_LENGTH = PASSWORD_MAX_LENGTH;
class Password extends _Validator.default {

  /**
   * Get message
   */
  getMessage(rule, value = '') {
    if (value.length < PASSWORD_MIN_LENGTH) {
      return 'Password is too short';
    } else if (value.length > PASSWORD_MAX_LENGTH) {
      return 'Password is too long';
    } else {
      return 'Password must not contain white spaces';
    }
  }

  /**
   * Validate
   */
  validate(value = '') {
    if (!value) {
      return Promise.resolve();
    }
    const { length } = value;
    if (length < PASSWORD_MIN_LENGTH ||
    length > PASSWORD_MAX_LENGTH ||
    !PASSWORD_REGEX.test(value)) {
      return Promise.reject();
    }
    return Promise.resolve();
  }}exports.default = Password;