"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _authenticate = _interopRequireDefault(require("./user/middleware/authenticate"));
var _authorize = _interopRequireDefault(require("./user/middleware/authorize"));
var _throttle = _interopRequireDefault(require("./core/middleware/throttle"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

{
  authenticate: _authenticate.default,
  authorize: _authorize.default,
  throttle: _throttle.default };exports.default = _default;