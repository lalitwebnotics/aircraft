"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Controller = require("../../modules/Controller");

/**
 * Rebate routes
 */var _default =
{
  '/retailer-products': {
    controller: 'retailerProducts',
    '/retailers/:product_id': {
      ...(0, _Controller.use)('multiple') } } };exports.default = _default;