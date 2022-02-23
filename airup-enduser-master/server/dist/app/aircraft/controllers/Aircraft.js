"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.populate = exports.default = exports.INVALID_AIRCRAFT_MODEL = void 0;var _lodash = require("lodash");

var _Controller = _interopRequireDefault(require("../../../modules/Controller"));
var _Exception = _interopRequireDefault(require("../../../modules/Exception"));
var _Aircraft = require("../models/Aircraft");
var _aws = _interopRequireDefault(require("../../aws"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
 * Error codes
 */
const INVALID_AIRCRAFT_MODEL = 'Invalid aircraft model';

/**
 * Populate fields
 */exports.INVALID_AIRCRAFT_MODEL = INVALID_AIRCRAFT_MODEL;
const populate = [
{
  path: 'aircraft_model',
  populate: [
  {
    path: 'certificates',
    populate: 'media' },

  {
    path: 'certificate',
    populate: 'media' },

  'aircraft_make',
  {
    path: 'engine_model',
    populate: [
    'engine_make'
    // {
    //   path: 'certificate',
    //   populate: 'media'
    // }
    ] }] },



'categories.category'];


/**
 * Aircraft controller
 */exports.populate = populate;
class Aircraft extends _Controller.default {constructor(...args) {super(...args);_defineProperty(this, "model",




    'Aircraft');}

  /**
   * Create single
   */
  async create(request) {
    const { user } = request.attachment('session'),
    body = request.body || {},
    model = await this.getModel('AircraftModel').findOne({ _id: body.aircraft_model });
    if (!model) {
      return _Exception.default.reject(INVALID_AIRCRAFT_MODEL, 400);
    }

    const s3 = new _aws.default();

    let imageUrl = request.body.imageUrl;

    if (request.req.files.newImage) {
      let image = request.req.files.newImage;
      let name = image.name;

      imageUrl = `hangarImage/${Date.now()}_${request.attachments.session.toObject().user}_${(name || '').replace(/\s/g, '')}`;

      const data = await s3.uploadS3(imageUrl, image.data);
    }

    const isAircraftAdded = await this.getModel().findOne({
      aircraft_model: model._id,
      user: user._id,
      year: body.year || null });


    if (isAircraftAdded) {
      return isAircraftAdded;
    }

    const aircraft = await this.getModel().create({
      aircraft_model: model._id,
      categories: [],
      frequency: _Aircraft.updates.frequencies.daily,
      products: (0, _lodash.keys)(_Aircraft.updates.products).reduce((sum, key) =>
      sum + _Aircraft.updates.products[key],
      0),
      user: user._id,
      year: body.year || null,
      imageUrl,
      tailNumber: request.body.tailNumber });


    return aircraft;
  }

  /**
   * Delete single
   */
  delete(request) {
    return this.getModel().deleteOne({
      _id: request.params.aircraft_id }).
    then(() => ({
      success: true }));

  }

  /**
   * Get multiple
   */
  multiple(request) {
    return this.paginate(request, {
      populate,
      filters: {
        user: request.attachment('session').user },

      noLean: true });

  }

  /**
   * Get single
   */
  single(request) {
    return this.getSingle(request, 'aircraft_id');
  }

  /**
   * Update single
   */
  async update(request) {

    const s3 = new _aws.default();

    let imageUrl = request.body.imageUrl;

    if (request.req.files.newImage) {
      let image = request.req.files.newImage;
      let name = image.name;

      imageUrl = `hangarImage/${Date.now()}_${request.attachments.session.toObject().user}_${(name || '').replace(/\s/g, '')}`;

      const data = await s3.uploadS3(imageUrl, image.data);
    }

    return this.getModel().
    findByIdAndUpdate(request.params.aircraft_id, (0, _lodash.pick)({ ...request.body,
      imageUrl },
    [
    'categories',
    'frequency',
    'products'])).

    then(() => ({
      success: true }));

  }}exports.default = Aircraft;