"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Controller = require("../../modules/Controller");

/**
 * Rebate routes
 */var _default =
{
  '/retailers': {
    controller: 'retailer',
    ...(0, _Controller.use)('create', 'multiple'),
    '/upload': {
      post: 'uploadLogo' },

    '/:retailer_id': {
      ...(0, _Controller.use)('delete', 'single', 'update') } } };exports.default = _default;