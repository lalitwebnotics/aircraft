"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Controller = require("../../modules/Controller");

/**
 * Media routes
 */var _default =
{
  '/certificates': {
    controller: 'certificate',
    ...(0, _Controller.use)('create', 'multiple'),
    '/upload': {
      post: 'uploadPdf' },

    '/pdf/:certificate_id': {
      get: 'viewCertificate' },

    '/:certificate_id': {
      ...(0, _Controller.use)('delete', 'single', 'update') } } };exports.default = _default;