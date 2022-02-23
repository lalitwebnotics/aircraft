import Validator from '../../../modules/Validator';

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Email validator
 */
export default class Email extends Validator {

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
  }
}
