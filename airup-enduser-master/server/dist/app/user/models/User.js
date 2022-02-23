"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _crypto = _interopRequireDefault(require("crypto"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
 * User
 */
const User = new _mongoose.Schema({
  addresses: [{
    ref: 'Address',
    type: _mongoose.Schema.Types.ObjectId }],

  contacts: [{
    ref: 'Contact',
    type: _mongoose.Schema.Types.ObjectId }],

  email: String,
  name: String,
  phone: String,
  password: String,
  imageUrl: String,
  role: {
    default: 'user',
    enum: [
    'user',
    'admin',
    'super'],

    type: String },

  status: {
    default: 'active',
    enum: [
    'active',
    'inactive',
    'suspended'],

    type: String },

  subscription: {
    default: 'weekly',
    enum: [
    'none',
    'daily',
    'weekly',
    'monthly'],

    type: String },

  token: String,
  username: String },
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



User;

/**
 * Before save
 */exports.default = _default;
User.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  _bcrypt.default.hash(this.password, 10, (err, hash) => {
    if (err) {
      next(err);
    } else {
      this.password = hash;
      next();
    }
  });
});

/**
 * Check password
 */
User.methods.check = function (password) {
  return new Promise((resolve, reject) => {
    _bcrypt.default.compare(password, this.password, (err, valid) => {
      if (err || !valid) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
};

/**
 * Generate token
 */
User.methods.generateToken = function () {
  this.token = _crypto.default.
  createHash('sha256').
  update(new Date().toString()).
  digest('hex');
  return this.save();
};

/**
 * Find account
 */
User.statics.findAccount = function (account, projections, options) {
  return this.findOne({
    $or: [{
      email: account },
    {
      username: account }] },

  projections, options);
};