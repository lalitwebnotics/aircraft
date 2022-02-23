"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Retailer
 */
const Retailer = new _mongoose.Schema({
  name: String,
  logo: {
    ref: 'Media',
    type: _mongoose.Schema.Types.ObjectId } },

{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



Retailer;exports.default = _default;