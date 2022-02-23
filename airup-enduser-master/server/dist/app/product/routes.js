"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Controller = require("../../modules/Controller");

/**
 * Product routes
 */var _default =
{
  '/products': {
    controller: 'product.product',
    ...(0, _Controller.use)('create', 'multiple'),
    '/details': {
      get: 'getAllProductsModel' },

    '/count-by-certificates': {
      get: 'getProductCountForCertificates' },

    '/upload': {
      post: 'uploadImage' },

    '/notify': {
      post: 'notify' },

    '/images/:id': {
      delete: 'deleteImages' },

    '/count': {
      get: 'count',
      '/multiple': {
        get: 'countMultiple' } },


    '/test': {
      get: 'test' },

    '/categories': {
      controller: 'product.category',
      ...(0, _Controller.use)('create', 'multiple'),
      '/random': {
        get: 'random' },

      '/:category_id': {
        ...(0, _Controller.use)('delete', 'single', 'update') } },


    '/track': {
      middleware: [
      'authenticate'],

      post: 'track' },

    '/tracked': {
      middleware: [
      'authenticate'],

      get: 'tracked' },

    '/alert-history': {
      middleware: [
      'authenticate'],

      get: 'alertHistory' },

    '/:product_id': {
      ...(0, _Controller.use)('delete', 'single', 'update') },

    '/previous-changes/:product_id': {
      get: 'getPreviousChanges' } } };exports.default = _default;