"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.MEDIA_PATH = void 0;var _fileType = _interopRequireDefault(require("file-type"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _path = _interopRequireDefault(require("path"));
var _readChunk = _interopRequireDefault(require("read-chunk"));
var _Controller = _interopRequireDefault(require("../../../modules/Controller"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const MEDIA_PATH = _path.default.join(process.cwd(), 'media');

/**
 * Media controller
 */exports.MEDIA_PATH = MEDIA_PATH;
class Media extends _Controller.default {constructor(...args) {super(...args);_defineProperty(this, "model",




    'Media');}

  /**
   * Create single
   */
  create() {
    return Promise.resolve({});
  }

  /**
   * Delete single
   */
  delete() {
    return Promise.resolve({
      success: true });

  }

  /**
   * Get single file
   */
  file(request) {
    const { params, res } = request,
    { media_path, media_file } = params,
    filepath = _path.default.join(MEDIA_PATH, media_path, media_file);
    if (!_fsExtra.default.existsSync(filepath)) {
      return request.next();
    }
    const stat = _fsExtra.default.statSync(filepath) || {},
    size = stat.size || 0,
    mime = (((0, _fileType.default)(_readChunk.default.sync(filepath, 0, size)) || {}).mime || '').split('/'),
    meta = mime.filter((type) => !!type).join('/');
    res.setHeader('Content-Type', meta);
    res.setHeader('Content-Length', size);
    _fsExtra.default.createReadStream(filepath).pipe(res);
    return request;
  }

  /**
   * Get multiple
   */
  multiple(request) {
    return this.paginate(request);
  }

  /**
   * Get single
   */
  single(request) {
    return '';
    return this.getSingle(request, 'media_id');
  }

  /**
   * Update single
   */
  update() {
    return Promise.resolve({});
  }}exports.default = Media;