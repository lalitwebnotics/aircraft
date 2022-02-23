"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Engine Model
 */
const EngineModel = new _mongoose.Schema({
  certificate: String,
  cylinders: Number,
  engine_make: {
    ref: 'EngineMake',
    type: _mongoose.Schema.Types.ObjectId },

  name: String,
  permalink: String,
  safe: String,
  type: {
    enum: [
    'carbureted',
    'injected'],

    type: String } },

{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



EngineModel;exports.default = _default;