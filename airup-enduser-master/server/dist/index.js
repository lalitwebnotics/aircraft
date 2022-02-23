"use strict";



var _app = _interopRequireDefault(require("./app"));







var _utils = require("./modules/utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}require("@babel/core").transform("code", { plugins: ["@babel/plugin-transform-runtime"] });require('dotenv').config();

switch ((process.env.APP_MODE || '').toLowerCase()) {
  case 'seed':
    /**
     * Seed application
     */
    _app.default.connect().then(() => {
      _app.default.seeded = {};
      return (0, _utils.queue)([
      seedMedia,
      seedCertificate,
      seedEngine,
      seedAircraft,
      seedManufacturer,
      seedProduct,
      seedUser].
      map((seed) => () => seed(_app.default))).then(() => {
        console.log('Seed complete');
        process.exit(0);
      });
    }).catch((err) => {
      console.log('App failed to seed');
      console.error(err);
    });
    break;
  default:
    /**
     * Start application
     */
    _app.default.start().then(() => {
      console.log('App started...');
    }).catch((err) => {
      console.log('App failed to start');
      console.error(err);
    });
    break;}