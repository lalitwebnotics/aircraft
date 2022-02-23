import { isUndefined } from 'lodash';

/**
 * Exception
 */
export default class Exception {

  static reject(message, code, status) {
    return Promise.reject(new this(message, code, status));
  }

  constructor(message, code, status) {
    this.code = code;
    this.message = message;
    this.status = isUndefined(status) ? this.code : status;
  }
}
