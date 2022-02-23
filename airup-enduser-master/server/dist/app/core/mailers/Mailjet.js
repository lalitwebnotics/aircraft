"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _lodash = require("lodash");
var _nodeMailjet = _interopRequireDefault(require("node-mailjet"));

var _Mailer = _interopRequireDefault(require("../../../modules/Mailer"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
 * Mailjet mailer
 */
class Mailjet extends _Mailer.default {

  /**
   * Initialize
   */
  init() {
    if ((0, _lodash.isUndefined)(this.mailer)) {
      this.mailer = _nodeMailjet.default.connect(this.config.apiKey, this.config.secretKey);
    }
  }

  /**
   * Send mail
   */
  send(options = {}) {
    const message = {
      From: {
        Email: options.sender.email },

      To: [],
      Subject: options.subject,
      TextPart: options.message.text };

    if (!(0, _lodash.isUndefined)(options.sender.name)) {
      message.From.Name = options.sender.name;
    }
    options.recipients.forEach((recipient) => {
      const to = {
        Email: recipient.email };

      if (!(0, _lodash.isUndefined)(recipient.name)) {
        to.Name = recipient.name;
      }
      message.To.push(to);
    });
    if (!(0, _lodash.isUndefined)(options.message.html)) {
      message.HTMLPart = options.message.html;
    }
    return this.mailer.post('send', {
      version: this.config.version }).
    request({
      Messages: [message] });

  }}exports.default = Mailjet;