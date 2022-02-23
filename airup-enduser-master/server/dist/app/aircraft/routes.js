"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Controller = require("../../modules/Controller");

/**
 * Aircraft routes
 */var _default =
{
  '/aircraft': {
    controller: 'aircraft.aircraft',
    ...(0, _Controller.withMiddleware)(['authenticate'], 'create', 'multiple'),
    '/makes': {
      controller: 'aircraft.make',
      ...(0, _Controller.use)('create', 'multiple'),
      '/:aircraft_make_id': {
        ...(0, _Controller.use)('delete', 'single', 'update') } },


    '/models': {
      controller: 'aircraft.model',
      ...(0, _Controller.use)('create', 'multiple'),
      '/random': {
        get: 'random' },

      '/:aircraft_model_id': {
        ...(0, _Controller.use)('delete', 'single', 'update') } },


    '/:aircraft_id': {
      ...(0, _Controller.use)('delete', 'single', 'update') } } };exports.default = _default;