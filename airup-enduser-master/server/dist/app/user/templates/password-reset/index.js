"use strict";var _fs = _interopRequireDefault(require("fs"));
var _path = require("path");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const submit = _fs.default.readFileSync((0, _path.join)(__dirname, 'submit.html'));

module.exports = {
  submit };