"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.METHODS = void 0;exports.use = use;exports.withMiddleware = withMiddleware;var _lodash = _interopRequireDefault(require("lodash"));
var _mongoose = require("mongoose");

var _utils = require("./utils");
var _Exception = _interopRequireDefault(require("./Exception"));
var _Request = _interopRequireDefault(require("./Request"));
var _Validator = _interopRequireDefault(require("./Validator"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const {
  forEach,
  get,
  isArray,
  isEmpty,
  isFunction,
  isObject,
  isString,
  isUndefined,
  set } =
_lodash.default;

/**
 * Standard methods
 */
const METHODS = {
  create: 'post',
  delete: 'delete',
  multiple: 'get',
  single: 'get',
  update: 'put' };


/**
 * Shorthand for methods
 */exports.METHODS = METHODS;
function use(...args) {
  const methods = {};
  args.forEach((method) => {
    methods[METHODS[method]] = method;
  });
  return methods;
}

/**
 * Use with middleware
 */
function withMiddleware(middleware, ...args) {
  const methods = {};
  args.forEach((method) => {
    methods[METHODS[method]] = {
      action: method,
      middleware };

  });
  return methods;
}

/**
 * Controller
 */
class Controller {

  constructor(app) {
    this.app = app;
    (0, _utils.bind)(this);
  }

  /**
   * Find one
   */
  findOne(filters, options = {}, projections = null) {
    return this.getModel().findOne(filters, projections, options);
  }

  /**
   * Get declared Model
   */
  getModel(model = this.model) {
    return this.app.getModel(model);
  }

  /**
   * Get single
   */
  getSingle(request, filters, options = {}, projections = null) {
    if (_mongoose.Types.ObjectId.isValid(filters)) {
      filters = {
        _id: filters };

    } else if (isString(filters)) {
      const valid = _mongoose.Types.ObjectId.isValid(request.params[filters]);
      if (!valid && isUndefined(this.getModel().schema.paths.permalink)) {
        return request.next();
      }
      filters = {
        [valid ? '_id' : 'permalink']: request.params[filters] };

    }
    return this.findOne(filters, options, projections).then((found) => {
      return found || request.next();
    });
  }

  /**
   * Initialize controller
   */
  init() {
    const app = this.app,
    promises = [];
    if (!isUndefined(this.validators)) {
      /**
       * Cache validators
       */
      forEach(this.validators, (validators, name) => {
        parseValidators(validators);
      });

      /**
       * Parse validators
       */
      function parseValidators(validators) {
        forEach(validators, (rules, input) => {
          if (input !== '@rules') {
            if (!isObject(rules)) {
              rules = rules['@rules'];
              parseValidators(rules);
            }
            (rules || []).forEach((raw, i) => {
              const rule = _Validator.default.parse(raw),
              validator = app.getValidator(rule.name);
              if (!validator) {
                throw new Error('Unknown validator: ' + rule.name);
              }
              rules[i] = validator.use(rule, input);
            });
          }
        });
      }
    }
    return Promise.all(promises);
  }

  /**
   * Paginate
   */
  paginate({ query }, options = {}, projections = null, modelName = this.model) {
    const Model = this.getModel(modelName),
    skip = Math.max(parseInt(query.start || '0'), 0),
    limit = Math.max(parseInt(query.limit || '20'), 1),
    others = { limit, skip };
    if (query.sort && ['asc', 'desc'].indexOf((query.order || '').toLowerCase()) >= 0) {
      others.sort = {
        [query.sort]: query.order };

    }
    return Promise.resolve(((filters = {}) => {
      if (isFunction(filters)) {
        filters = filters({});
      }
      return filters;
    })(options.filters)).then((filters) => {
      /**
       * Multiple _id filter
       */
      if (!isUndefined(query.id)) {
        filters._id = {
          $in: (query.id + '').split(',').filter((_id) => {
            return _mongoose.Types.ObjectId.isValid(_id);
          }) };

      }
      return Model.countDocuments(filters).then((count) => {
        const find = Model.find(filters, projections, others);
        if (!options.noLean) {
          find.lean();
        }
        if (options.populate) {
          find.populate(options.populate);
        }
        return find.then((results) => {
          return {
            count,
            results };

        });
      });
    });
  }

  /**
   * Sanitize inputs using lodash
   */
  sanitize(name, inputs = {}) {
    const sanitizers = get(this.sanitizers, name);
    if (isUndefined(sanitizers)) {
      return inputs;
    }
    if (inputs instanceof _Request.default) {
      inputs = inputs.body || {};
    }
    recurse(sanitizers);
    return inputs;

    /**
     * Recurse sanitizers
     */
    function recurse(parent, path = '') {
      if (isString(parent)) {
        const value = get(inputs, path);
        if (!isUndefined(value)) {
          set(inputs, path, _lodash.default[parent](value));
        } else {
          const dots = path.split('.');
          if (dots.length > 0) {
            const last = dots.pop(),
            data = get(inputs, dots.join('.'));
            if (isArray(data)) {
              data.forEach((item, index) => {
                const current = get(data[index], last);
                if (!isUndefined(current)) {
                  set(data[index], last, _lodash.default[parent](current));
                }
              });
            }
          }
        }
      } else {
        forEach(parent, (child, key) => {
          const subpath = (path ? path + '.' : path) + key;
          if (isArray(child)) {
            child.forEach((item, index) => {
              recurse(item, subpath + (isString(item) ? '' : '[' + index + ']'));
            });
          } else {
            recurse(child, subpath);
          }
        });
      }
    }
  }

  /**
   * Validate inputs
   */
  validate(name, inputs = {}) {
    const validators = get(this.validators, name);
    inputs = this.sanitize(name, inputs);
    if (isUndefined(validators)) {
      return Promise.resolve(inputs);
    }
    if (inputs instanceof _Request.default) {
      inputs = inputs.body || {};
    }
    const errors = {},
    promises = [];
    recurse(validators);
    return Promise.all(promises).then(() => {
      if (isEmpty(errors)) {
        return Promise.resolve(inputs);
      } else {
        return _Exception.default.reject(errors, 400);
      }
    });

    /**
     * Recurse validators
     */
    function recurse(parent, path = '') {
      if (isFunction(parent)) {
        const data = get(inputs, path);
        if (isArray(data)) {
          data.forEach((item, index) => {
            promises.push(parent(item).catch((message) => {
              const subpath = path + '[' + index + ']';
              if (isUndefined(errors[subpath])) {
                errors[subpath] = [];
              }
              errors[subpath].push(message);
              return Promise.resolve();
            }));
          });
        } else {
          promises.push(parent(data).catch((message) => {
            if (isUndefined(errors[path])) {
              errors[path] = [];
            }
            errors[path].push(message);
            return Promise.resolve();
          }));
        }
      } else {
        forEach(parent, (child, key) => {
          const subpath = (path ? path + '.' : path) + key;
          if (isArray(child)) {
            child.forEach((item, index) => {
              recurse(item, subpath + (isFunction(item) ? '' : '[' + index + ']'));
            });
          } else {
            recurse(child, subpath);
          }
        });
      }
    }
  }}exports.default = Controller;