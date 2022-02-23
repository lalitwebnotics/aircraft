"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = throttle;var _utils = require("../../../modules/utils");

/**
 * Throttle middleware
 */
function throttle(timeout = 0) {
  return () => {
    return new Promise((resolve) => {
      setTimeout(resolve, parseInt(timeout));
    });
  };
}