"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Controller = _interopRequireDefault(require("../../../modules/Controller"));
var _AwsSES = _interopRequireDefault(require("../../../modules/AwsSES"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


class ContactAdvertisement extends _Controller.default {constructor(...args) {super(...args);_defineProperty(this, "model",
    'ContactAdvertisement');_defineProperty(this, "validators",

    {
      create: {
        email: ['required', 'email', 'unique:ContactAdvertisement'],
        name: ['required'],
        phoneNumber: ['required'],
        description: ['required'] } });}



  /**
   * Create single
   */
  create(request) {
    const ses = new _AwsSES.default();
    let details = null;
    return this.
    validate('create', request).
    then((inputs) =>
    this.getModel().create(inputs)).

    then((data) => {
      details = data;
      return ses.sendThankYouEmailForAdvertisement(data.email, 'Advertisement Registration Successful');
    }).
    then(() => {
      return ses.sendEmailAdvertisementNotification('Advertisement Register Notification', {
        name: details.name,
        email: details.email,
        companyName: details.companyName,
        phoneNumber: details.phoneNumber,
        description: details.description });

    }).
    then(() =>
    this.getModel().
    findOne({ _id: details._id }, '-password -token'));

  }}exports.default = ContactAdvertisement;