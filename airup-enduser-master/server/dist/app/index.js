"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Application = _interopRequireDefault(require("../modules/Application"));
var _config = _interopRequireDefault(require("../config"));
var _controllers = _interopRequireDefault(require("./controllers"));
var _mailers = _interopRequireDefault(require("./mailers"));
var _middleware = _interopRequireDefault(require("./middleware"));
var _models = _interopRequireDefault(require("./models"));
var _routes = _interopRequireDefault(require("./routes"));
var _templates = _interopRequireDefault(require("./templates"));
var _validators = _interopRequireDefault(require("./validators"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const app = new _Application.default(_config.default.app).
controllers(_controllers.default).
mailers(_mailers.default).
middleware(_middleware.default).
models(_models.default).
routes(_routes.default).
templates(_templates.default).
validators(_validators.default);var _default =

app;exports.default = _default;