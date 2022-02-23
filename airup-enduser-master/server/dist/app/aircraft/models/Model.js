"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Aircraft Model
 */
const AircraftModel = new _mongoose.Schema({
  aircraft_make: {
    ref: 'AircraftMake',
    type: _mongoose.Schema.Types.ObjectId },

  model: String,
  certificate: {
    ref: 'Certificate',
    type: _mongoose.Schema.Types.ObjectId },

  certificates: [{
    ref: 'Certificate',
    type: _mongoose.Schema.Types.ObjectId }],

  engine_model: {
    ref: 'EngineModel',
    type: _mongoose.Schema.Types.ObjectId },

  name: String,
  permalink: String,
  safe: String,
  turbo: Boolean,
  years: [Number] },
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



AircraftModel;exports.default = _default;