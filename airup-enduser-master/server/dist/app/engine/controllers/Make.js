"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = require("../../../modules/utils");
var _Controller = _interopRequireDefault(require("../../../modules/Controller"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
 * Engine make controller
 */
class EngineMake extends _Controller.default {constructor(...args) {super(...args);_defineProperty(this, "model",




    'EngineMake');_defineProperty(this, "sanitizers",




    {
      create: {
        name: ['trim'] },

      update: {
        name: ['trim'] } });_defineProperty(this, "validators",






    {
      create: {
        name: ['required'] },

      update: {
        name: ['required'] } });}



  /**
   * Create single
   */
  create(request) {
    return this.validate('create', request).then(({ name }) => {
      const safe = (0, _utils.permalink)(name);
      return this.getModel().countDocuments({
        safe }).
      then((count) => {
        return this.getModel().create({
          name,
          permalink: safe + (count > 0 ? '-' + (count + 1) : ''),
          safe });

      });
    });
  }

  /**
   * Delete single
   */
  delete(request) {
    return this.getModel().
    findByIdAndRemove(request.params.engine_make_id).
    then(() => ({
      success: true }));

  }

  /**
   * Get multiple
   */
  multiple(request) {
    return this.paginate(request, {
      filters: (filters) => {
        if (request.query.name) {
          filters.name = {
            $regex: new RegExp(request.query.name, 'i') };

        }
        return filters;
      } });

  }

  /**
   * Get single
   */
  single(request) {
    return this.getSingle(request, 'engine_make_id');
  }

  /**
   * Update single
   */
  update(request) {
    const id = request.params.engine_make_id;
    return this.validate('update', request).then(({ name }) => {
      const safe = (0, _utils.permalink)(name);
      return this.getModel().countDocuments({
        _id: {
          $ne: id },

        safe }).
      then((count) => {
        return this.getModel().findByIdAndUpdate(id, {
          name,
          permalink: safe + (count > 0 ? '-' + (count + 1) : ''),
          safe });

      });
    });
  }}exports.default = EngineMake;