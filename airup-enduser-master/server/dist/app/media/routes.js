"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Controller = require("../../modules/Controller");

/**
 * Media routes
 */var _default =
{
  '/media': {
    controller: 'media',
    ...(0, _Controller.use)('create', 'multiple'),
    '/:media_id': {
      ...(0, _Controller.use)('delete', 'single', 'update') },

    '/:media_path': {
      '/:media_file': {
        get: 'file' } } } };exports.default = _default;