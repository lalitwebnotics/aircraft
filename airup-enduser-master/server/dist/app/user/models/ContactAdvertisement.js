"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = require("mongoose");

/**
 * Session
 */
const ContactAdvertisement = new _mongoose.Schema({
  name: {
    type: String,
    required: true },

  email: {
    type: String,
    required: true },

  companyName: {
    type: String },

  phoneNumber: {
    type: String,
    required: true },

  description: {
    type: String,
    required: true } },

{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });var _default =



ContactAdvertisement;exports.default = _default;