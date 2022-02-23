"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.MEDIA_PATH = void 0;var _path = _interopRequireDefault(require("path"));
var _utils = require("../../modules/utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const MEDIA_PATH = _path.default.join(process.cwd(), 'data/media');

/**
 * Seed media
 */exports.MEDIA_PATH = MEDIA_PATH;var _default =
({ getModel, mongoose: { connection }, seeded }) => (0, _utils.queue)([
/**
 * Truncate media collection
 */
() => {
  console.log('Emptying media...');
  const Media = getModel('Media'),
  { collectionName } = Media.collection;
  seeded.Media = {};
  return connection.dropCollection(collectionName).catch(() => {
    return Promise.resolve();
  }).then((result) => {
    console.log('Emptied media');
    return result;
  });
}]);exports.default = _default;