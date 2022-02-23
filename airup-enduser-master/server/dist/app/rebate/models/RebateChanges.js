"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Rebate
 */
const RebateChanges = new _mongoose.Schema({
  name: String,
  amount: Number,
  rebate: {
    ref: 'Rebate',
    type: _mongoose.Schema.Types.ObjectId },

  manufacturer: {
    ref: 'Manufacturer',
    type: _mongoose.Schema.Types.ObjectId },

  pdf: {
    ref: 'Media',
    type: _mongoose.Schema.Types.ObjectId },

  url: String,
  expiry_date: Date,
  permalink: String,
  safe: String },
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



RebateChanges;exports.default = _default;