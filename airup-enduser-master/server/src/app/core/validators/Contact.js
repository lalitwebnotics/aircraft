import { isEmpty, isUndefined, snakeCase, upperFirst } from 'lodash';

import { EMAIL_REGEX } from './Email';
import Validator from '../../../modules/Validator';

export const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export const TITLES = {
  email: 'Email address',
  mobile: 'Mobile number',
  telephone: 'Telephone number',
  website: 'Website URL'
};

/**
 * Contact validator
 */
export default class Contact extends Validator {

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
        if (EMAIL_REGEX.test(value)) {
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
        break;
    }
    return Promise.reject();
  }
}
