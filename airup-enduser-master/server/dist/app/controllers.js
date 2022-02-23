"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Core = _interopRequireDefault(require("./core/controllers/Core"));
var _Aircraft = _interopRequireDefault(require("./aircraft/controllers/Aircraft"));
var _Make = _interopRequireDefault(require("./aircraft/controllers/Make"));
var _Model = _interopRequireDefault(require("./aircraft/controllers/Model"));
var _Certificate = _interopRequireDefault(require("./certificate/controllers/Certificate"));
var _Make2 = _interopRequireDefault(require("./engine/controllers/Make"));
var _Model2 = _interopRequireDefault(require("./engine/controllers/Model"));
var _Manufacturer = _interopRequireDefault(require("./manufacturer/controllers/Manufacturer"));
var _Rebate = _interopRequireDefault(require("./rebate/controllers/Rebate"));
var _Retailer = _interopRequireDefault(require("./retailer/controllers/Retailer"));
var _RetailerProducts = _interopRequireDefault(require("./retailer_products/controllers/RetailerProducts"));
var _Media = _interopRequireDefault(require("./media/controllers/Media"));
var _Category = _interopRequireDefault(require("./product/controllers/Category"));
var _Product = _interopRequireDefault(require("./product/controllers/Product"));
var _Session = _interopRequireDefault(require("./user/controllers/Session"));
var _User = _interopRequireDefault(require("./user/controllers/User"));
var _ContactAdvertisement = _interopRequireDefault(require("./user/controllers/ContactAdvertisement"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

{
  core: _Core.default,
  aircraft: {
    aircraft: _Aircraft.default,
    make: _Make.default,
    model: _Model.default },

  certificate: _Certificate.default,
  engine: {
    make: _Make2.default,
    model: _Model2.default },

  rebate: _Rebate.default,
  retailer: _Retailer.default,
  retailerProducts: _RetailerProducts.default,
  manufacturer: _Manufacturer.default,
  media: _Media.default,
  product: {
    category: _Category.default,
    product: _Product.default },

  user: {
    session: _Session.default,
    user: _User.default,
    contactAdvertisement: _ContactAdvertisement.default } };exports.default = _default;