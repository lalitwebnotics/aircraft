import Validator from '../../../modules/Validator';

export const USERNAME_REGEX = /^[a-z]+[a-z0-9]*$/;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 16;

/**
 * Username validator
 */
export default class Username extends Validator {

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
    if ((length < USERNAME_MIN_LENGTH) ||
        (length > USERNAME_MAX_LENGTH) ||
        !USERNAME_REGEX.test(value)) {
      return Promise.reject();
    }
    return Promise.resolve();
  }
}
