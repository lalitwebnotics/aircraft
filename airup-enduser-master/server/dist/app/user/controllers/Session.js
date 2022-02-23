"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.populate = exports.default = exports.INVALID_USER_OR_PASSWORD = void 0;var _Controller = _interopRequireDefault(require("../../../modules/Controller"));
var _Exception = _interopRequireDefault(require("../../../modules/Exception"));
var _authorize = require("../middleware/authorize");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
 * Error codes
 */
const INVALID_USER_OR_PASSWORD = 'Invalid user or password';

/**
 * Populate fields
 */exports.INVALID_USER_OR_PASSWORD = INVALID_USER_OR_PASSWORD;
const populate = [
'user'];


/**
 * Session controller
 */exports.populate = populate;
class Session extends _Controller.default {constructor(...args) {super(...args);_defineProperty(this, "model",




    'Session');}

  /**
   * Login user
   */
  create(request) {
    const { password, remember } = request.body;
    return this.getModel('User').findAccount((request.body.user || '').toLowerCase(), '_id password').then((user) => {
      if (!user) {
        return _Exception.default.reject(INVALID_USER_OR_PASSWORD, 400);
      }
      return user.check(password).catch(() => {
        return _Exception.default.reject(INVALID_USER_OR_PASSWORD, 400);
      });
    }).then((user) =>
    this.getModel().create({
      expires: remember ? 60 * 60 * 24 * 30 : 60 * 30,
      user: user._id }).
    then(({ _id, expires }) => {
      return (0, _authorize.encode)(_id, expires).then((token) => ({
        expires,
        token }));

    }));

  }

  /**
   * Logout user
   */
  delete(request) {
    return request.
    attachment('session').
    logout().
    then(() => ({}));
  }

  /**
   * Get multiple
   */
  multiple(request) {
    return this.paginate(request, {
      populate });

  }

  /**
   * Get authorized user
   */
  single(request) {
    return this.getModel('User').
    findOne({ _id: request.attachment('session').user }, '-password -token').
    populate([
    'addresses',
    'contacts']);

  }}exports.default = Session;