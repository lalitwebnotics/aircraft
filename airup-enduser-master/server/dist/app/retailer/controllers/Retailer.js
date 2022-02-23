"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.populate = exports.default = void 0;var _lodash = require("lodash");
var _utils = require("../../../modules/utils");
var _Controller = _interopRequireDefault(require("../../../modules/Controller"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
 * Populate fields
 */
const populate = [
'product',
'logo'];



/**
 * Retailer controller
 */exports.populate = populate;
class Retailer extends _Controller.default {constructor(...args) {super(...args);_defineProperty(this, "model",




    'Retailer');_defineProperty(this, "validators",




    {
      create: {
        // amount: ['required'],
        name: ['required'] },

      update: {
        // amount: ['required'],
        name: ['required'] },

      logo: {} });}


  /**
   * Create single
   */
  create(request) {
    return this.validate('create', request).then(({ name, price, product_url, product }) => {
      try {
        return this.getModel().create({
          name,
          price,
          product_url,
          product });

      } catch (error) {
        return Exception.reject(error, 500);
      }
    });
  }

  /**
   * Delete single
   */
  async delete(request) {
    await this.getModel().findByIdAndDelete(request.params.retailer_id);

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

  uploadLogo(request) {
    return this.validate('logo', request).then(({ file, id }) => {

      if (request.req.files == undefined) {return;}
      let logo = request.req.files.logo;
      console.log(request.req.files.logo);

      if (logo != undefined) {
        let name = logo.name;
        let full_path = name + "_" + Date.now();
        let type = logo.mimetype;

        console.log('222');

        try {
          // Use the mv() method to place the file somewhere on your server
          logo.mv('data/data/media/photos/logos/' + full_path, function (err) {
            if (err)
            return Exception.reject(err, 500);
          });
        } catch (err) {
          console.log(err);
        }

        this.getModel('Media').create({
          name,
          type,
          full_path }).
        then((media) => {

          if (request.body.id != undefined) {
            this.getModel().findById(request.body.id, function (err, doc) {
              doc.logo = media;
              doc.save();
            });
          } else {
            //on create
            this.getModel().findOne().sort('-created_at').exec(function (err, doc) {
              doc.logo = media;
              doc.save();
            });
          }

        });
      }
    });
  }


  /**
   * Get single
   */
  single(request) {
    return this.getSingle(request, 'retailer_id');
  }

  /**
   * Update single
   */
  update(request) {
    const id = request.params.retailer_id;
    return this.validate('update', request).then(({ name, price, product_url, product }) => {
      return this.getModel().findByIdAndUpdate(id, {
        name,
        price,
        product_url,
        product });

    });
  }}exports.default = Retailer;