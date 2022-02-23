import { bind } from './utils';

/**
 * Mailer class
 */
export default class Mailer {

  constructor(app, name) {
    this.app = app;
    this.config = this.app.config.mail.providers[name] || {};
    bind(this);
  }

  /**
   * Initialize
   */
  init() {
    throw new Error('This method must implement a mailer configuration');
  }

  /**
   * Send mail
   */
  send() {
    throw new Error('This method must implement a `send` function');
  }
}
