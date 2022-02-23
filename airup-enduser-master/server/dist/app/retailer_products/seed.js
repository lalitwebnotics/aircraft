"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _lodash = require("lodash");
var _utils = require("../../modules/utils");
var _data = require("../../../data/data.json");

/**
 * Seed manufacturer
 */var _default =
({ getModel, mongoose: { connection }, seeded }) => (0, _utils.queue)([
/**
 * Seed manufacturers
 */
() => {
  console.log('Seeding manufacturer(s)...');
  const Address = getModel('Address'),
  Contact = getModel('Contact'),
  Manufacturer = getModel('Manufacturer'),
  { collectionName } = Manufacturer.collection;
  seeded.Manufacturer = {};
  return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
    return (0, _utils.queue)(_data.manufacturers.map(({ address, contacts, id, name, nickname }) => {
      return () => {
        const children = {
          address: undefined,
          contacts: [] };

        return (0, _utils.queue)([
        () => Address.create(address).then(({ _id }) => {
          children.address = _id;
        }),
        () => (0, _utils.queue)(contacts.map((contact) => {
          return () => Contact.create(contact).then(({ _id }) => {
            children.contacts.push(_id);
          });
        }))]).
        then(() => {
          const safe = (0, _utils.permalink)(name);
          return Manufacturer.create({
            ...children,
            name,
            nickname,
            permalink: safe,
            safe }).
          then((manufacturer) => {
            return seeded.Manufacturer[id] = manufacturer;
          });
        });
      };
    })).then(() => {
      console.log('Seeded ' + (0, _lodash.keys)(seeded.Manufacturer).length + ' manufacturer(s)');
    });
  });
}]);exports.default = _default;