"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Controller = require("../../modules/Controller");

/**
 * Engine routes
 */var _default =
{
  '/engines': {
    '/makes': {
      controller: 'engine.make',
      ...(0, _Controller.use)('create', 'multiple'),
      '/:engine_make_id': {
        ...(0, _Controller.use)('delete', 'single', 'update') } },


    '/models': {
      controller: 'engine.model',
      ...(0, _Controller.use)('create', 'multiple'),
      '/:engine_model_id': {
        ...(0, _Controller.use)('delete', 'single', 'update') } } } };exports.default = _default;