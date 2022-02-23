"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _lodash = require("lodash");
var _path = _interopRequireDefault(require("path"));
var _utils = require("../../modules/utils");
var _data = require("../../../data/data.json");
var _seed = require("../media/seed");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
 * Seed certificate
 */var _default =
({ getModel, mongoose: { connection }, seeded }) => (0, _utils.queue)([
/**
 * Seed certificates
 */
() => {
  console.log('Seeding certificate(s)...');
  const Certificate = getModel('Certificate'),
  Media = getModel('Media'),
  { collectionName } = Certificate.collection;
  seeded.Certificate = {};
  return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
    return (0, _utils.queue)(_data.certificates.map(({ id, media, reference, type }) => () => {
      const copied = [],
      safe = (0, _utils.permalink)(reference);
      return (0, _utils.queue)(media.map(({ file_name, name, type }) => () => {
        return Media.copy({
          name: _path.default.join('certificates', file_name),
          title: name,
          type },
        _seed.MEDIA_PATH).then((file) => {
          copied.push(file._id);
          return file;
        });
      })).then(() => Certificate.create({
        media: copied,
        permalink: safe,
        reference,
        safe,
        type }).
      then((certificate) => {
        return seeded.Certificate[id] = certificate;
      }));
    })).then(() => {
      console.log('Seeded ' + (0, _lodash.keys)(seeded.Certificate).length + ' certificate(s)');
    });
  });
}]);exports.default = _default;