"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * RetailerProducts
 */
const RetailerProducts = new _mongoose.Schema({
  retailer: {
    ref: 'Retailer',
    type: _mongoose.Schema.Types.ObjectId },

  price: Number,
  product_url: String,
  product: {
    ref: 'Product',
    type: _mongoose.Schema.Types.ObjectId },

  permalink: String,
  safe: String },
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



RetailerProducts;exports.default = _default;