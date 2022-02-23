"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.populate = exports.default = void 0;var _lodash = require("lodash");
var _utils = require("../../../modules/utils");
var _Controller = _interopRequireDefault(require("../../../modules/Controller"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
 * Populate fields
 */
const populate = [
'manufacturer'];



/**
 * Rebate controller
 */exports.populate = populate;
class Rebate extends _Controller.default {constructor(...args) {super(...args);_defineProperty(this, "model",




    'Rebate');_defineProperty(this, "validators",




    {
      create: {
        // amount: ['required'],
        manufacturer: ['required'],
        url: ['required'],
        expiry_date: ['required'] },

      update: {
        // amount: ['required'],
        manufacturer: ['required'],
        url: ['required'],
        expiry_date: ['required'] } });}



  /**
   * Create single
   */
  create(request) {
    return this.validate('create', request).then(({ amount, manufacturer, url, expiry_date }) => {
      try {
        return this.getModel().create({
          amount,
          url,
          expiry_date,
          manufacturer });

      } catch (error) {
        return Exception.reject(error, 500);
      }
    });
  }

  /**
   * Delete single
   */
  async delete(request) {
    await this.getModel().findByIdAndDelete(request.params.rebate_id);

    return {
      success: true };

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
    return this.getSingle(request, 'rebate_id');
  }

  /**
   * Update single
   */
  update(request) {
    const id = request.params.rebate_id;
    return this.validate('update', request).then(({ amount, manufacturer, url, expiry_date }) => {
      return this.getModel().findByIdAndUpdate(id, {
        amount,
        manufacturer,
        url,
        expiry_date });

    });
  }}exports.default = Rebate;