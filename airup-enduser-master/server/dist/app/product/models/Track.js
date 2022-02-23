"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.updates = exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Track updates
 */
const updates = {
  none: 0,
  price: 1,
  rebate: 2 };


/**
 * Track
 */exports.updates = updates;
const Track = new _mongoose.Schema({
  product: {
    ref: 'Product',
    type: _mongoose.Schema.Types.ObjectId },

  last_notified: Date,
  updates: {
    default: updates.none,
    type: Number },

  user: {
    ref: 'User',
    type: _mongoose.Schema.Types.ObjectId } },

{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



Track;exports.default = _default;