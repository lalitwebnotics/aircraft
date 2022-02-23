"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.RESOURCE_NOT_FOUND = void 0;var _path = require("path");
var _Controller = _interopRequireDefault(require("../../../modules/Controller"));
var _Exception = _interopRequireDefault(require("../../../modules/Exception"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const RESOURCE_NOT_FOUND = 'Resource not found';

/**
 * Core controller
 */exports.RESOURCE_NOT_FOUND = RESOURCE_NOT_FOUND;
class Core extends _Controller.default {

  /**
   * Handle 404
   */
  notFound() {
    return _Exception.default.reject(RESOURCE_NOT_FOUND, 404);
  }

  sendBuild(request) {
    request.res.sendFile((0, _path.join)(__dirname, '../../../../../client/build/index.html'));
  }}exports.default = Core;