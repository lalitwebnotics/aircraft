"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Controller = require("../../modules/Controller");

/**
 * User routes
 */var _default =
{
  '/sessions': {
    controller: 'user.session',
    ...(0, _Controller.use)('create', 'multiple'),
    '/me': {
      middleware: [
      'authenticate'],

      ...(0, _Controller.use)('delete', 'single') } },


  '/advertisement': {
    controller: 'user.contactAdvertisement',
    ...(0, _Controller.use)('create') },

  '/users': {
    controller: 'user.user',
    '/send-mail': {
      get: 'sendMail' },

    get: {
      action: 'multiple',
      middleware: [
      'authenticate'] },


    post: 'create',
    '/upload/profile': {
      middleware: [
      'authenticate'],

      post: 'updateProfilePicture' },

    '/password': {
      post: 'resetPassword',
      put: 'updatePassword' },

    '/:user_id': {
      middleware: [
      'authenticate'],

      '/update-account': {
        post: 'updateAccount' },

      ...(0, _Controller.use)('delete', 'single', 'update') } } };exports.default = _default;