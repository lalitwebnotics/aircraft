"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.populate = exports.default = void 0;var _Controller = _interopRequireDefault(require("../../../modules/Controller"));
var _aws = _interopRequireDefault(require("../../aws"));
var _Exception = _interopRequireDefault(require("../../../modules/Exception"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
 * Populate fields
 */
const populate = [
'product',
{
  path: 'retailer',
  populate: 'logo' }];




/**
 * Retailer controller
 */exports.populate = populate;
class Retailer extends _Controller.default {constructor(...args) {super(...args);_defineProperty(this, "model",




    'RetailerProducts');_defineProperty(this, "validators",




    {});}


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
        if (request.params.retailer_id) {
          filters.retailer = request.params.retailer_id;
        }
        if (request.params.product_id) {
          filters.product = request.params.product_id;
        }
        return filters;
      },
      populate });

  }

  /**
   * Get single
   */
  single(request) {
    return this.getSingle(request, 'retailer_product_id');
  }}exports.default = Retailer;