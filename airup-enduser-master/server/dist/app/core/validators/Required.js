"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _lodash = require("lodash");

var _Validator = _interopRequireDefault(require("../../../modules/Validator"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
 * Required validator
 */
class Required extends _Validator.default {

  /**
   * Get message
   */
  getMessage({ input }) {
    return (0, _lodash.upperFirst)((0, _lodash.snakeCase)(input).replace(/\_/g, ' ')) + ' is required';
  }

  /**
   * Validate
   */
  validate(value) {
    if ((0, _lodash.isUndefined)(value) || (0, _lodash.isEmpty)(value)) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }}exports.default = Required;