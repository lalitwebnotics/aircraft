"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.USERNAME_REGEX = exports.USERNAME_MIN_LENGTH = exports.USERNAME_MAX_LENGTH = void 0;var _Validator = _interopRequireDefault(require("../../../modules/Validator"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const USERNAME_REGEX = /^[a-z]+[a-z0-9]*$/;exports.USERNAME_REGEX = USERNAME_REGEX;
const USERNAME_MIN_LENGTH = 3;exports.USERNAME_MIN_LENGTH = USERNAME_MIN_LENGTH;
const USERNAME_MAX_LENGTH = 16;

/**
 * Username validator
 */exports.USERNAME_MAX_LENGTH = USERNAME_MAX_LENGTH;
class Username extends _Validator.default {

  /**
   * Get message
   */
  getMessage(rule, value = '') {
    if (value.length < USERNAME_MIN_LENGTH) {
      return 'Username is too short';
    } else if (value.length > USERNAME_MAX_LENGTH) {
      return 'Username is too long';
    } else if (!USERNAME_REGEX.test(value.charAt(0))) {
      return 'First character of username must be a letter';
    } else {
      return 'Username must be alphanumeric';
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
    if (length < USERNAME_MIN_LENGTH ||
    length > USERNAME_MAX_LENGTH ||
    !USERNAME_REGEX.test(value)) {
      return Promise.reject();
    }
    return Promise.resolve();
  }}exports.default = Username;