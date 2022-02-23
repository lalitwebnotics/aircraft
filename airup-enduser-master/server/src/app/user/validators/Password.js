import Validator from '../../../modules/Validator';

export const PASSWORD_REGEX = /^(?!.*[\s])/;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

/**
 * Password validator
 */
export default class Password extends Validator {

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
    if ((length < PASSWORD_MIN_LENGTH) ||
        (length > PASSWORD_MAX_LENGTH) ||
        !PASSWORD_REGEX.test(value)) {
      return Promise.reject();
    }
    return Promise.resolve();
  }
}
