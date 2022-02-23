import { deburr, isFunction, kebabCase } from 'lodash';

/**
 * Utilities
 */
export function bind(object) {
  Object.getOwnPropertyNames(object.constructor.prototype).forEach((key) => {
    if (key !== 'constructor' && isFunction(object[key])) {
      object[key] = object[key].bind(object);
    }
  });
  return object;
}

/**
 * Permalink
 */
export function permalink(string) {
  return kebabCase(deburr(string));
}

/**
 * Queue callbacks returning promises
 */
export function queue(callbacks) {
  return callbacks.reduce((promise, callback) => {
    return promise.then((value) => {
      return callback(value);
    });
  }, Promise.resolve());
}

/**
 * mongoose id to string
 */
export function formatModelIdToString(id){
  return id + "";
}