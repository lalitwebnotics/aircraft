"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.KEYS_PATH = exports.JWT_ALGORITHM = exports.FAILED_TO_ENCODE_TOKEN = exports.FAILED_TO_DECODE_TOKEN = exports.AUTHORIZATION_HEADER = void 0;exports.decode = decode;exports.default = authorize;exports.encode = encode;exports.keys = void 0;var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _path = _interopRequireDefault(require("path"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const AUTHORIZATION_HEADER = 'Authorization';exports.AUTHORIZATION_HEADER = AUTHORIZATION_HEADER;
const KEYS_PATH = _path.default.join(process.cwd(), 'keys');exports.KEYS_PATH = KEYS_PATH;
const JWT_ALGORITHM = 'RS256';exports.JWT_ALGORITHM = JWT_ALGORITHM;

const FAILED_TO_DECODE_TOKEN = 'Failed to decode token';exports.FAILED_TO_DECODE_TOKEN = FAILED_TO_DECODE_TOKEN;
const FAILED_TO_ENCODE_TOKEN = 'Failed to encode token';

/**
 * Keys
 */exports.FAILED_TO_ENCODE_TOKEN = FAILED_TO_ENCODE_TOKEN;
const keys = {
  private: _fsExtra.default.readFileSync(KEYS_PATH + '/jwt.key'),
  public: _fsExtra.default.readFileSync(KEYS_PATH + '/jwt.pub') };


/**
 * Authorize
 */exports.keys = keys;
function authorize() {
  return (request) => {
    const authorization = request.header(AUTHORIZATION_HEADER.toLowerCase()),
    { config } = request.app;
    // Reset authorization header
    request.header(AUTHORIZATION_HEADER, '');
    if (!authorization) {
      return null;
    }
    return decode((authorization || '').substring('bearer '.length)).catch(() => null).then((_id) => {
      if (!_id) {
        return null;
      }
      return request.app.getModel('Session').findOne({ _id });
    }).then((session) => {
      const promises = [];
      if (session) {
        if (session.status === 'active' && session.isExpired()) {
          promises.push(session.expire());
        } else if (session.getDifference() >= config.api.refresh) {
          promises.push(session.reload().then(() =>
          encode(session._id, session.expires)).
          then((authorization) => {
            request.header(AUTHORIZATION_HEADER, session.expires + ':' + authorization);
          }));
        }
        request.attach({ session });
      }
      return Promise.all(promises);
    });
  };
}

/**
 * Decode
 */
function decode(token) {
  return new Promise((resolve, reject) => {
    _jsonwebtoken.default.verify(token, keys.public, {
      algorithms: [JWT_ALGORITHM] },
    (err, data) => {
      if (err || !data) {
        reject(err || FAILED_TO_DECODE_TOKEN);
      } else {
        resolve(data.id);
      }
    });
  });
}

/**
 * Encode
 */
function encode(id, expiresIn = 60 * 30) {
  return new Promise((resolve, reject) => {
    _jsonwebtoken.default.sign({ id }, keys.private, {
      algorithm: JWT_ALGORITHM,
      expiresIn },
    (err, token) => {
      if (err || !token) {
        reject(err || FAILED_TO_ENCODE_TOKEN);
      } else {
        resolve(token);
      }
    });
  });
}