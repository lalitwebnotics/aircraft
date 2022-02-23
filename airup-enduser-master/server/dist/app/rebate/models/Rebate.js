"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Rebate
 */
const Rebate = new _mongoose.Schema({
  amount: Number,
  manufacturer: {
    ref: 'Manufacturer',
    type: _mongoose.Schema.Types.ObjectId },

  url: String,
  expiry_date: Date,
  permalink: String,
  safe: String },
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



Rebate;exports.default = _default;