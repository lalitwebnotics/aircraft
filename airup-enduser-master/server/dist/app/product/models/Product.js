"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Product
 */
const Product = new _mongoose.Schema({
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

  categories: [{
    ref: 'Category',
    type: _mongoose.Schema.Types.ObjectId }],

  // retailers: [{
  //   ref: 'Retailer',
  //   type: Schema.Types.ObjectId
  // }],
  rebate: {
    ref: 'Rebate',
    type: _mongoose.Schema.Types.ObjectId },

  old_product: String,
  certificates: [{
    ref: 'Certificate',
    type: _mongoose.Schema.Types.ObjectId }],

  description: String,
  manufacturer: {
    ref: 'Manufacturer',
    type: _mongoose.Schema.Types.ObjectId },

  media: [{
    ref: 'Media',
    type: _mongoose.Schema.Types.ObjectId }],

  name: String,
  part: String,
  permalink: String,
  pma: {
    enum: [
    'maybe',
    'no',
    'yes'],

    type: String },

  price: Number,
  old_price: Number,
  safe: String,
  tso: {
    enum: [
    'maybe',
    'no',
    'yes'],

    type: String },

  url: String },
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



Product;exports.default = _default;