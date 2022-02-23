"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _lodash = require("lodash");
var _path = _interopRequireDefault(require("path"));
var _utils = require("../../modules/utils");
var _data = require("../../../data/data.json");
var _seed = require("../media/seed");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
 * Seed product
 */var _default =
({ getModel, mongoose: { connection }, seeded }) => (0, _utils.queue)([
/**
 * Seed categories
 */
() => {
  console.log('Seeding categor(ies)...');
  const Category = getModel('Category'),
  { collectionName } = Category.collection;
  seeded.Category = {};
  return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
    return (0, _utils.queue)(_data.categories.map(({ id, name }) => {
      const safe = (0, _utils.permalink)(name);
      return () => Category.create({
        name,
        permalink: safe,
        safe }).
      then((category) => {
        return seeded.Category[id] = category;
      });
    })).then(() => {
      console.log('Seeded ' + (0, _lodash.keys)(seeded.Category).length + ' categor(ies)');
    });
  });
},
/**
 * Seed products
 */
() => {
  console.log('Seeding product(s)...');
  const Media = getModel('Media'),
  Product = getModel('Product'),
  { collectionName } = Product.collection,
  seededAircraftMakes = (0, _lodash.keys)(seeded.AircraftMake).map((id) => seeded.AircraftMake[id]),
  seededAircraftModels = (0, _lodash.keys)(seeded.AircraftModel).map((id) => seeded.AircraftModel[id]);
  seeded.Product = {};
  return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
    return (0, _utils.queue)(_data.products.map(({
      categories,
      certificate_id,
      description,
      id,
      manufacturer_id,
      media,
      name,
      part,
      pma,
      price,
      tso,
      url }) =>
    () => {
      const copied = [],
      approved_aircraft_makes = [],
      approved_aircraft_models = [],
      cert_id = parseInt(certificate_id);
      if (cert_id > 0) {
        _data.aircraft_models.forEach((aircraft_model) => {
          if (aircraft_model.certificates && aircraft_model.certificates.indexOf(cert_id) >= 0) {
            const model = seeded.AircraftModel[aircraft_model.id] || {};
            if (model._id) {
              approved_aircraft_makes.push(model.aircraft_make);
              approved_aircraft_models.push(model._id);
            }
          }
        });
      }
      const unique_approved_aircraft_makes = (0, _lodash.uniq)(approved_aircraft_makes);
      const other_aircraft_makes = (0, _lodash.uniq)([
      ...unique_approved_aircraft_makes,
      ...(0, _lodash.sampleSize)(seededAircraftMakes, (0, _lodash.random)(1, 20)).
      map((aircraft_make) => aircraft_make._id)]);

      const other_aircraft_models = (0, _lodash.uniq)([
      ...approved_aircraft_models,
      ...(0, _lodash.sampleSize)(seededAircraftModels, (0, _lodash.random)(1, 50)).
      map((aircraft_model) => aircraft_model._id)]);

      const safe = (0, _utils.permalink)(name);
      return (0, _utils.queue)(media.map(({ file_name, name, type }) => () => {
        return Media.copy({
          name: _path.default.join('photos', file_name),
          title: name,
          type },
        _seed.MEDIA_PATH).then((file) => {
          copied.push(file._id);
          return file;
        });
      })).then(() => Product.create({
        aircraft_makes: other_aircraft_makes,
        aircraft_models: other_aircraft_models,
        approved_aircraft_makes: unique_approved_aircraft_makes,
        approved_aircraft_models,
        categories: categories.
        map((category_id) => (seeded.Category[category_id] || {})._id).
        filter((_id) => !(0, _lodash.isUndefined)(_id)),
        certificate: (seeded.Certificate[certificate_id] || {})._id,
        description,
        manufacturer: (seeded.Manufacturer[manufacturer_id] || {})._id,
        media: copied,
        name,
        part,
        permalink: safe,
        pma,
        price,
        safe,
        tso,
        url }).
      then((product) => {
        return seeded.Product[id] = product;
      }));
    })).then(() => {
      console.log('Seeded ' + (0, _lodash.keys)(seeded.Product).length + ' product(s)');
    });
  });
},
/**
 * Seed tracks
 */
() => {
  console.log('Emptying track(s)...');
  const Track = getModel('Track'),
  { collectionName } = Track.collection;
  seeded.Track = {};
  return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
    console.log('Emptied track(s)');
  });
}]);exports.default = _default;