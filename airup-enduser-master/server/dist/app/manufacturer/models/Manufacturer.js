"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Manufacturer
 */
const Manufacturer = new _mongoose.Schema({
  address: {
    ref: 'Address',
    type: _mongoose.Schema.Types.ObjectId },

  contacts: [{
    ref: 'Contact',
    type: _mongoose.Schema.Types.ObjectId }],

  name: String,
  nickname: String,
  permalink: String,
  safe: String },
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



Manufacturer;exports.default = _default;