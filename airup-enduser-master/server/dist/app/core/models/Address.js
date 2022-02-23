"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Address
 */
const Address = new _mongoose.Schema({
  line_1: String,
  line_2: String,
  city: String,
  country: String,
  state: String,
  zip_code: String },
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



Address;exports.default = _default;