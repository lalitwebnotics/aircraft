"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _passwordReset = _interopRequireDefault(require("./user/templates/password-reset"));
var _welcome = _interopRequireDefault(require("./user/templates/welcome"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

{
  user: {
    passwordReset: _passwordReset.default,
    welcome: _welcome.default } };exports.default = _default;