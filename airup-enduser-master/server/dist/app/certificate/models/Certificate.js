"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Certificate
 */
const Certificate = new _mongoose.Schema({
  name: String,
  ctype: String, //certifate type
  cid: String, //certificate id
  aml_name: String,
  products: [{
    ref: 'Product',
    type: _mongoose.Schema.Types.ObjectId }],

  aircraft_makes: [{
    ref: 'AircraftMake',
    type: _mongoose.Schema.Types.ObjectId }],

  aircraft_models: [{
    ref: 'AircraftModel',
    type: _mongoose.Schema.Types.ObjectId }],

  approved_aircraft_makes: [{
    ref: 'AircraftMake',
    type: _mongoose.Schema.Types.ObjectId }],

  approved_aircraft_models: [{
    ref: 'AircraftModel',
    type: _mongoose.Schema.Types.ObjectId }],

  pdf: {
    ref: 'Media',
    type: _mongoose.Schema.Types.ObjectId },

  aml_pdf: {
    ref: 'Media',
    type: _mongoose.Schema.Types.ObjectId },

  permalink: String,
  reference: String,
  safe: String,
  type: {
    enum: [
    'aircraft',
    'engine',
    'supplemental'],

    type: String } },

{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



Certificate;exports.default = _default;