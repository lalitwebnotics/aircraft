"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.bind = bind;exports.formatModelIdToString = formatModelIdToString;exports.permalink = permalink;exports.queue = queue;var _lodash = require("lodash");

/**
 * Utilities
 */
function bind(object) {
  Object.getOwnPropertyNames(object.constructor.prototype).forEach((key) => {
    if (key !== 'constructor' && (0, _lodash.isFunction)(object[key])) {
      object[key] = object[key].bind(object);
    }
  });
  return object;
}

/**
 * Permalink
 */
function permalink(string) {
  return (0, _lodash.kebabCase)((0, _lodash.deburr)(string));
}

/**
 * Queue callbacks returning promises
 */
function queue(callbacks) {
  return callbacks.reduce((promise, callback) => {
    return promise.then((value) => {
      return callback(value);
    });
  }, Promise.resolve());
}

/**
 * mongoose id to string
 */
function formatModelIdToString(id) {
  return id + "";
}