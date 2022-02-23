"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _lodash = require("lodash");
var _utils = require("../../modules/utils");
var _data = require("../../../data/data.json");

/**
 * Seed engine
 */var _default =
({ getModel, mongoose: { connection }, seeded }) => (0, _utils.queue)([
/**
 * Seed engine makes
 */
() => {
  console.log('Seeding engine make(s)...');
  const EngineMake = getModel('EngineMake'),
  { collectionName } = EngineMake.collection;
  seeded.EngineMake = {};
  return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
    return (0, _utils.queue)(_data.engine_makes.map(({ id, name }) => {
      const safe = (0, _utils.permalink)(name);
      return () => EngineMake.create({
        name,
        permalink: safe,
        safe }).
      then((make) => {
        return seeded.EngineMake[id] = make;
      });
    })).then(() => {
      console.log('Seeded ' + (0, _lodash.keys)(seeded.EngineMake).length + ' engine make(s)');
    });
  });
},
/**
 * Seed engine models
 */
() => {
  console.log('Seeding engine model(s)...');
  const EngineModel = getModel('EngineModel'),
  { collectionName } = EngineModel.collection;
  seeded.EngineModel = {};
  return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
    return (0, _utils.queue)(_data.engine_models.map(({
      certificate_id,
      cylinders,
      engine_make_id,
      id,
      name,
      type }) =>
    {
      return () => EngineModel.create({
        certificate: (seeded.Certificate[certificate_id] || {})._id,
        cylinders,
        engine_make: (seeded.EngineMake[engine_make_id] || {})._id,
        name,
        permalink: (0, _utils.permalink)(name),
        type }).
      then((model) => {
        return seeded.EngineModel[id] = model;
      });
    })).then(() => {
      console.log('Seeded ' + (0, _lodash.keys)(seeded.EngineModel).length + ' engine model(s)');
    });
  });
}]);exports.default = _default;