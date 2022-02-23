"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _lodash = require("lodash");
var _path = require("path");
var _package = _interopRequireDefault(require("../../package.json"));
var _local = _interopRequireDefault(require("./local"));
var _dotenv = _interopRequireDefault(require("dotenv"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_dotenv.default.config({ path: (0, _path.join)(__dirname, '../../.env') });

/**
 * Configuration
 */var _default =
(0, _lodash.merge)({
  
  app: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || '3001',
    version: process.env.VERSION || _package.default.version,
    url: process.env.URL || 'http://aircraftupgrade.com/',
    database: {
      mongodb: {
        url: process.env.MONGODB_URL || 'mongodb://127.0.0.1:3001/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
        options: {
          useFindAndModify: false,
          useNewUrlParser: true,
          useUnifiedTopology: true } } },



    api: {
      // Refresh token every 10 minutes
      refresh: 60 * 10 },

    cors: {
      exposedHeaders: 'Authorization' },

    mail: {
      providers: {
        mailjet: {
          apiKey: 'f7256f8753111427cfb7e59197dd2a15',
          secretKey: '8feb30a08674f683e80996382d904e7a',
          version: 'v3.1' } },


      sender: {
        email: 'hello@homesdavao.com',
        name: 'Aircraft Upgrade' } } } },



_local.default);exports.default = _default;