import { isUndefined } from 'lodash';
import mailjet from 'node-mailjet';

import Mailer from '../../../modules/Mailer';

/**
 * Mailjet mailer
 */
export default class Mailjet extends Mailer {

  /**
   * Initialize
   */
  init() {
    if (isUndefined(this.mailer)) {
      this.mailer = mailjet.connect(this.config.apiKey, this.config.secretKey);
    }
  }

  /**
   * Send mail
   */
  send(options = {}) {
    const message = {
      From: {
        Email: options.sender.email
      },
      To: [],
      Subject: options.subject,
      TextPart: options.message.text
    };
    if (!isUndefined(options.sender.name)) {
      message.From.Name = options.sender.name;
    }
    options.recipients.forEach((recipient) => {
      const to = {
        Email: recipient.email
      };
      if (!isUndefined(recipient.name)) {
        to.Name = recipient.name;
      }
      message.To.push(to);
    });
    if (!isUndefined(options.message.html)) {
      message.HTMLPart = options.message.html;
    }
    return this.mailer.post('send', {
      version: this.config.version
    }).request({
      Messages: [message]
    });
  }
}
