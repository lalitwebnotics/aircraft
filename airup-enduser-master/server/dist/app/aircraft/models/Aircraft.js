"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.updates = exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Category updates
 */
const updates = {
  categories: {
    none: 0,
    active: 1,
    price: 2,
    rebate: 4 },

  frequencies: {
    none: 0,
    daily: 1,
    weekly: 2,
    monthly: 3 },

  products: {
    none: 0,
    approved: 1,
    nonapproved: 2 } };



/**
 * Aircraft
 */exports.updates = updates;
const Aircraft = new _mongoose.Schema({
  aircraft_model: {
    ref: 'AircraftModel',
    type: _mongoose.Schema.Types.ObjectId },

  categories: [{
    category: {
      ref: 'Category',
      type: _mongoose.Schema.Types.ObjectId },

    updates: Number }],

  frequency: Number,
  products: Number,
  user: {
    ref: 'User',
    type: _mongoose.Schema.Types.ObjectId },

  year: Number,
  last_notified: Date,
  newProductDate: Date,
  updateProductDate: Date,
  tailNumber: String,
  imageUrl: {
    type: String,
    get: function (imageUrl) {
      if (imageUrl && imageUrl.indexOf('https://') == -1) {
        return `https://d2kijztdgb1j07.cloudfront.net/${imageUrl}`;
      }
      return imageUrl || '';
    } } },

{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' },

  toObject: { getters: true },
  toJSON: { getters: true } });var _default =


Aircraft;exports.default = _default;