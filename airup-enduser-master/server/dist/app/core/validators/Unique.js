"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _lodash = require("lodash");

var _Validator = _interopRequireDefault(require("../../../modules/Validator"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
 * Unique validator
 */
class Unique extends _Validator.default {

  /**
   * Get message
   */
  getMessage({ input }) {
    return (0, _lodash.upperFirst)((0, _lodash.snakeCase)(input).replace(/\_/g, ' ')) + ' is already in use';
  }

  /**
   * Validate
   */
  validate(value, { input, options = [] }) {
    const Model = this.app.getModel(options[0]);
    if (!Model) {
      throw new Error('Missing Model option');
    }
    return Model.
    findOne({ [options[1] || input]: value }, '_id').
    then((item) => {
      if (!item) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    });
  }}exports.default = Unique;