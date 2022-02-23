"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _lodash = require("lodash");
var _moment = _interopRequireDefault(require("moment"));
var _utils = require("../../modules/utils");
var _data = require("../../../data/data.json");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
 * Seed aircraft
 */var _default =
({ getModel, mongoose: { connection }, seeded }) => (0, _utils.queue)([
/**
 * Seed aircraft
 */
() => {
  console.log('Emptying aircraft(s)...');
  const Aircraft = getModel('Aircraft'),
  { collectionName } = Aircraft.collection;
  seeded.Aircraft = {};
  return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
    console.log('Emptied aircraft(s)');
  });
},
/**
 * Seed aircraft makes
 */
() => {
  console.log('Seeding aircraft make(s)...');
  const AircraftMake = getModel('AircraftMake'),
  { collectionName } = AircraftMake.collection;
  seeded.AircraftMake = {};
  return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
    return (0, _utils.queue)(_data.aircraft_makes.map(({ id, name }) => {
      const safe = (0, _utils.permalink)(name);
      return () => AircraftMake.create({
        name,
        permalink: safe,
        safe }).
      then((make) => {
        return seeded.AircraftMake[id] = make;
      });
    })).then(() => {
      console.log('Seeded ' + (0, _lodash.keys)(seeded.AircraftMake).length + ' aircraft make(s)');
    });
  });
},
/**
 * Seed aircraft models
 */
() => {
  console.log('Seeding aircraft model(s)...');
  const AircraftModel = getModel('AircraftModel'),
  { collectionName } = AircraftModel.collection;
  seeded.AircraftModel = {};
  return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
    return (0, _utils.queue)(_data.aircraft_models.map(({
      aircraft_make_id,
      certificate_id,
      engine_model_id,
      id,
      name,
      turbo }) =>
    {
      const max = parseInt((0, _moment.default)().format('Y')) + 1,
      low = (0, _lodash.random)(1950, max),
      high = (0, _lodash.random)(low, max),
      safe = (0, _utils.permalink)(name);
      return () => AircraftModel.create({
        aircraft_make: (seeded.AircraftMake[aircraft_make_id] || {})._id,
        certificate: (seeded.Certificate[certificate_id] || {})._id,
        engine_model: (seeded.EngineModel[engine_model_id] || {})._id,
        name,
        permalink: safe,
        safe,
        turbo,
        years: (0, _lodash.range)(low, high) }).
      then((model) => {
        return seeded.AircraftModel[id] = model;
      });
    })).then(() => {
      console.log('Seeded ' + (0, _lodash.keys)(seeded.AircraftModel).length + ' aircraft model(s)');
    });
  });
}]);exports.default = _default;