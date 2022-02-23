"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.URL_REGEX = exports.TITLES = void 0;var _lodash = require("lodash");

var _Email = require("./Email");
var _Validator = _interopRequireDefault(require("../../../modules/Validator"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;exports.URL_REGEX = URL_REGEX;

const TITLES = {
  email: 'Email address',
  mobile: 'Mobile number',
  telephone: 'Telephone number',
  website: 'Website URL' };


/**
 * Contact validator
 */exports.TITLES = TITLES;
class Contact extends _Validator.default {

  /**
   * Get message
   */
  getMessage(rule, { type }) {
    return TITLES[type] + ' is invalid';
  }

  /**
   * Validate
   */
  validate({ type, value }) {
    if (!value) {
      return Promise.resolve();
    }
    switch (type) {
      case 'email':
        if (_Email.EMAIL_REGEX.test(value)) {
          return Promise.resolve();
        }
        break;
      case 'mobile':
      case 'telephone':
        return Promise.resolve();
      case 'website':
        if (URL_REGEX.test(value)) {
          return Promise.resolve();
        }
        break;}

    return Promise.reject();
  }}exports.default = Contact;