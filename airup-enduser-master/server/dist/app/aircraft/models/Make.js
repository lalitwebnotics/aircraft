"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Aircraft Make
 */
const AircraftMake = new _mongoose.Schema({
  name: String,
  permalink: String,
  safe: String },
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



AircraftMake;exports.default = _default;