import { isEmpty, isUndefined, snakeCase, upperFirst } from 'lodash';

import Validator from '../../../modules/Validator';

/**
 * Required validator
 */
export default class Required extends Validator {

  /**
   * Get message
   */
  getMessage({ input }) {
    return upperFirst(snakeCase(input).replace(/\_/g, ' ')) + ' is required';
  }

  /**
   * Validate
   */
  validate(value) {
    if (isUndefined(value) || isEmpty(value)) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }
}
