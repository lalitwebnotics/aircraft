"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Controller = require("../../modules/Controller");

/**
 * Manufacturer routes
 */var _default =
{
  '/manufacturers': {
    controller: 'manufacturer',
    ...(0, _Controller.use)('create', 'multiple'),
    '/:manufacturer_id': {
      ...(0, _Controller.use)('delete', 'single', 'update') } } };exports.default = _default;