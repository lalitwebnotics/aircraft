"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.populate = exports.default = void 0;var _lodash = require("lodash");

var _utils = require("../../../modules/utils");
var _Controller = _interopRequireDefault(require("../../../modules/Controller"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


/**
 * Populate fields
 */
const populate = [
'rebate'];



/**
 * Category controller
 */exports.populate = populate;
class Category extends _Controller.default {constructor(...args) {super(...args);_defineProperty(this, "model",




    'Category');_defineProperty(this, "sanitizers",




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
    return this.validate('create', request).then(({ name, rebate }) => {
      const safe = (0, _utils.permalink)(name);
      return this.getModel().countDocuments({
        safe }).
      then((count) => {
        return this.getModel().create({
          name,
          rebate,
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
    findByIdAndRemove(request.params.category_id).
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
    return this.getSingle(request, 'category_id');
  }

  /**
   * Update single
   */
  update(request) {
    const id = request.params.category_id;
    return this.validate('update', request).then(({ name, rebate }) => {
      const safe = (0, _utils.permalink)(name);
      return this.getModel().countDocuments({
        _id: {
          $ne: id },

        safe }).
      then((count) => {
        return this.getModel().findByIdAndUpdate(id, {
          name,
          rebate,
          permalink: safe + (count > 0 ? '-' + (count + 1) : ''),
          safe });

      });
    });
  }}exports.default = Category;