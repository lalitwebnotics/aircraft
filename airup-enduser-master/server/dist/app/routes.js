"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.version = exports.default = void 0;var _config = _interopRequireDefault(require("../config"));
var _routes = _interopRequireDefault(require("./aircraft/routes"));
var _routes2 = _interopRequireDefault(require("./certificate/routes"));
var _routes3 = _interopRequireDefault(require("./engine/routes"));
var _routes4 = _interopRequireDefault(require("./manufacturer/routes"));
var _routes5 = _interopRequireDefault(require("./media/routes"));
var _routes6 = _interopRequireDefault(require("./product/routes"));
var _routes7 = _interopRequireDefault(require("./user/routes"));
var _routes8 = _interopRequireDefault(require("./rebate/routes"));
var _routes9 = _interopRequireDefault(require("./retailer/routes"));
var _routes10 = _interopRequireDefault(require("./retailer_products/routes"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const version = 'v' + _config.default.app.version.split('.')[0];exports.version = version;var _default =

{
  '/api': {
    middleware: [
    `throttle:${_config.default.app.throttle || 0}`,
    'authorize'],

    ['/' + version]: {
      ..._routes.default,
      ..._routes2.default,
      ..._routes3.default,
      ..._routes4.default,
      ..._routes8.default,
      ..._routes9.default,
      ..._routes10.default,
      ..._routes5.default,
      ..._routes6.default,
      ..._routes7.default } } };exports.default = _default;