"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Contact
 */
const Contact = new _mongoose.Schema({
  type: {
    enum: [
    'email',
    'mobile',
    'telephone',
    'website'],

    type: String },

  value: String },
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



Contact;exports.default = _default;