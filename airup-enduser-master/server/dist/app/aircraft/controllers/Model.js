"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.populate = exports.default = exports.INVALID_ENGINE_MODEL = exports.INVALID_AIRCRAFT_MAKE = void 0;var _lodash = require("lodash");
var _mongoose = require("mongoose");
var _utils = require("../../../modules/utils");
var _Controller = _interopRequireDefault(require("../../../modules/Controller"));
var _Exception = _interopRequireDefault(require("../../../modules/Exception"));
var _Aircraft = _interopRequireDefault(require("../models/Aircraft"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


/**
 *
 */
const INVALID_AIRCRAFT_MAKE = 'Invalid aircraft make';exports.INVALID_AIRCRAFT_MAKE = INVALID_AIRCRAFT_MAKE;
const INVALID_ENGINE_MODEL = 'Invalid engine model';

/**
 * Populate fields
 */exports.INVALID_ENGINE_MODEL = INVALID_ENGINE_MODEL;
const populate = [
{
  path: 'certificate',
  populate: 'media' },

'certificates',
'aircraft_make',
{
  path: 'engine_model',
  populate: [
  'engine_make'
  // {
  //   path: 'certificate',
  //   populate: 'media'
  // }
  ] }];



/**
 * Aircraft model controller
 */exports.populate = populate;
class AircraftModel extends _Controller.default {constructor(...args) {super(...args);_defineProperty(this, "model",




    'AircraftModel');_defineProperty(this, "validators",




    {
      create: {
        name: ['required'],
        // turbo: ['required'],
        aircraft_make: ['required'],
        engine_model: ['required'] },

      update: {
        name: ['required'],
        aircraft_make: ['required'],
        engine_model: ['required'] } });}



  /**
   * Create single
   */
  create(request) {
    return this.validate('create', request).then(({ name, turbo, aircraft_make, certificates, engine_model, certificate, years }) => {
      const safe = (0, _utils.permalink)(name);

      this.getEngineModel(engine_model).then((engineModel) => {

        if (turbo.length == 0) {
          turbo = 1;
        }

        if (!engineModel) {
          return _Exception.default.reject(INVALID_ENGINE_MODEL, 400);
        }

        return this.getModel().countDocuments({
          safe }).
        then((count) => {
          return this.getModel().create({
            name,
            turbo,
            years,
            certificates,
            aircraft_make,
            engine_model: engineModel,
            permalink: safe + (count > 0 ? '-' + (count + 1) : ''),
            safe });

        });
      });
    });
  }

  /**
   * get aircraft make for model
   */
  getAircraftMake(aircraft_make) {
    return this.getModel('AircraftMake').findById(aircraft_make);
  }

  /**
   * get engine for aircraft model
   */
  getEngineModel(engine_model) {
    return this.getModel('EngineModel').findById(engine_model);
  }

  /**
   * Delete single
   */
  delete(request) {
    return this.getModel().
    findByIdAndRemove(request.params.aircraft_model_id).
    then(() => ({
      success: true })).

    catch(() => {
      error: true;
    });
  }

  /**
   * Get multiple
   */
  multiple(request) {
    return this.paginate(request, {
      populate,
      filters: (filters) => {
        if (_mongoose.Types.ObjectId.isValid(request.query.aircraft_make)) {
          filters.aircraft_make = request.query.aircraft_make;
        }
        if (request.query.name) {
          filters.name = {
            $regex: new RegExp(request.query.name, 'i') };

        }
        return filters;
      } });

  }

  /**
   * Random category ids
   */
  random({ query }) {
    return this.getModel().find({}, { select: '_id' }).then((results) => {
      return (0, _lodash.sampleSize)(results.map(({ _id }) => _id), query.count || 20);
    });
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

    const id = request.params.aircraft_model_id;

    return this.validate('update', request).then(({ name, turbo, aircraft_make, certificates, engine_model, years }) => {
      const safe = (0, _utils.permalink)(name);

      if (turbo.length == 0) {
        turbo = 1;
      }

      return this.getModel().countDocuments({
        _id: {
          $ne: id },

        safe }).
      then((count) => {

        return Promise.all([
        this.getEngineModel(engine_model),
        this.getAircraftMake(aircraft_make)]).
        then((responses) => {
          return this.getModel().findByIdAndUpdate(id, {
            aircraft_make: responses[1],
            engine_model: responses[0],
            name,
            years,
            certificates,
            turbo,
            permalink: safe + (count > 0 ? '-' + (count + 1) : ''),
            safe });

        });

        return this.getModel().findByIdAndUpdate(id, {
          name,
          aircraft_make: {},
          engine_model: {},
          certificates,
          permalink: safe + (count > 0 ? '-' + (count + 1) : ''),
          safe });

      });
    });
  }}exports.default = AircraftModel;