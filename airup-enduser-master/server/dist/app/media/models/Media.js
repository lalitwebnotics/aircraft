"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.MEDIA_PATH = void 0;var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _mongoose = require("mongoose");
var _path = _interopRequireDefault(require("path"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const MEDIA_PATH = _path.default.resolve(process.cwd(), 'media');

/**
 * Media
 */exports.MEDIA_PATH = MEDIA_PATH;
const Media = new _mongoose.Schema({
  name: String,
  title: String,
  full_path: String,
  type: String },
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' } });



/**
 * Copy file and create media
 */
Media.statics.copy = function copy({ name, title, type }, dir) {
  const target = _path.default.join(MEDIA_PATH, name);
  _fsExtra.default.ensureFileSync(target);
  _fsExtra.default.copySync(_path.default.join(dir, name), target);
  return this.create({
    name,
    title,
    type });

};var _default =


Media;exports.default = _default;