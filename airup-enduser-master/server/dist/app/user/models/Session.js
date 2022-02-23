"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Session
 */
const Session = new _mongoose.Schema({
  expires: {
    default: 60 * 30,
    type: Number },

  refresh: {
    default: 0,
    type: Number },

  status: {
    default: 'active',
    enum: [
    'active',
    'expired',
    'inactive'],

    type: String },

  user: {
    ref: 'User',
    type: _mongoose.Schema.Types.ObjectId } },

{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



Session;

/**
 * Expire session
 */exports.default = _default;
Session.methods.expire = function () {
  this.status = 'expired';
  return this.save();
};

/**
 * Get seconds since last update
 */
Session.methods.getDifference = function () {
  return (new Date() - this.updated_at) / 1000;
};

/**
 * Session is expired
 */
Session.methods.isExpired = function () {
  return this.status !== 'active' || this.getDifference() > this.expires;
};

/**
 * Logout
 */
Session.methods.logout = function () {
  this.status = 'inactive';
  return this.save();
};

/**
 * Reload session
 */
Session.methods.reload = function () {
  this.status = 'active';
  this.refresh++;
  return this.save();
};