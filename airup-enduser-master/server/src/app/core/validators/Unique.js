import { snakeCase, upperFirst } from 'lodash';

import Validator from '../../../modules/Validator';

/**
 * Unique validator
 */
export default class Unique extends Validator {

  /**
   * Get message
   */
  getMessage({ input }) {
    return upperFirst(snakeCase(input).replace(/\_/g, ' ')) + ' is already in use';
  }

  /**
   * Validate
   */
  validate(value, { input, options = [] }) {
    const Model = this.app.getModel(options[0]);
    if (!Model) {
      throw new Error('Missing Model option');
    }
    return Model
      .findOne({ [options[1] || input]: value }, '_id')
      .then((item) => {
        if (!item) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      });
  }
}
