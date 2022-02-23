"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.populate = exports.default = void 0;var _Controller = _interopRequireDefault(require("../../../modules/Controller"));
var _utils = require("../../../modules/utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
 * Populate fields
 */
const populate = [
'engine_make'];


/**
 * Engine model controller
 */exports.populate = populate;
class EngineModel extends _Controller.default {constructor(...args) {super(...args);_defineProperty(this, "model",




    'EngineModel');_defineProperty(this, "validators",




    {
      create: {
        name: ['required'],
        engine_make: ['required'] },

      update: {
        name: ['required'] } });}



  /**
   * Create single
   */
  create(request) {
    return this.validate('create', request).then(({ name, engine_make, cylinders, type, certificate }) => {
      const safe = (0, _utils.permalink)(name);

      if (type.length == 0) {
        type = "carbureted";
      }

      this.getEngineMake(engine_make).then((engineMake) => {
        return this.getModel().countDocuments({
          safe }).
        then((count) => {
          return this.getModel().create({
            name,
            type,
            cylinders,
            certificate,
            engine_make: engineMake,
            permalink: safe + (count > 0 ? '-' + (count + 1) : ''),
            safe });

        });
      });
    });
  }

  /**
   * get engine for aircraft model
   */
  getEngineMake(engine_make) {
    return this.getModel('EngineMake').findById(engine_make);
  }

  /**
   * Delete single
   */
  delete(request) {
    return this.getModel().
    findByIdAndRemove(request.params.engine_model_id).
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
      },
      populate });

  }

  /**
   * Get single
   */
  single(request) {
    return this.getSingle(request, 'aircraft_model_id', {
      populate });

  }

  /**
   * Update single
   */
  update(request) {
    const id = request.params.engine_model_id;
    return this.validate('update', request).then(({ name, type, cylinders, certificate, engine_make }) => {

      const safe = (0, _utils.permalink)(name);

      return this.getModel().countDocuments({
        _id: {
          $ne: id },

        safe }).
      then((count) => {
        return this.getModel().findByIdAndUpdate(id, {
          name,
          type,
          cylinders,
          certificate,
          engine_make,
          permalink: safe + (count > 0 ? '-' + (count + 1) : ''),
          safe });

      });
    });
  }}exports.default = EngineModel;