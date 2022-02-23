"use strict";


var _app = _interopRequireDefault(require("./app"));







var _utils = require("./modules/utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}require("@babel/core").transform("code", { plugins: ["@babel/plugin-transform-runtime"] });

switch ((process.env.APP_MODE || '').toLowerCase()) {
  case 'seed':
    /**
                * Seed application
                */
    _app["default"].connect().then(function () {
      _app["default"].seeded = {};
      return (0, _utils.queue)([
      seedMedia,
      seedCertificate,
      seedEngine,
      seedAircraft,
      seedManufacturer,
      seedProduct,
      seedUser].
      map(function (seed) {return function () {return seed(_app["default"]);};})).then(function () {
        console.log('Seed complete');
        process.exit(0);
      });
    })["catch"](function (err) {
      console.log('App failed to seed');
      console.error(err);
    });
    break;
  default:
    /**
            * Start application
            */
    _app["default"].start().then(function () {
      console.log('App started...');
    })["catch"](function (err) {
      console.log('App failed to start');
      console.error(err);
    });
    break;}
