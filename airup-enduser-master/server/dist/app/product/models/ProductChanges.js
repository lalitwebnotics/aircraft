"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * ProductChanges
 */
const ProductChanges = new _mongoose.Schema({
  newValues: Object,
  oldValues: Object,
  rebateChanges: Boolean,
  productChanges: Boolean,
  productId: {
    ref: 'Product',
    type: _mongoose.Schema.Types.ObjectId },

  changedBy: {
    ref: 'User',
    type: _mongoose.Schema.Types.ObjectId } },

{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



ProductChanges;exports.default = _default;