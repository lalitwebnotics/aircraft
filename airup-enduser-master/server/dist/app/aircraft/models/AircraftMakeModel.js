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
const AircraftMakeModel = new _mongoose.Schema({
  name: String },
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



Aircraft;exports.default = _default;