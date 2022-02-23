"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Category
 */
const Category = new _mongoose.Schema({
  name: String,
  rebate: {
    ref: 'Rebate',
    type: _mongoose.Schema.Types.ObjectId },

  permalink: String,
  safe: String },
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



Category;exports.default = _default;