"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.UNAUTHORIZED_ACCESS = exports.SESSION_IS_EXPIRED = void 0;exports.default = _default;var _lodash = require("lodash");

var _Exception = _interopRequireDefault(require("../../../modules/Exception"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const SESSION_IS_EXPIRED = 'Session is expired';exports.SESSION_IS_EXPIRED = SESSION_IS_EXPIRED;
const UNAUTHORIZED_ACCESS = 'Unauthorized access';

/**
 * Authenticate middleware
 */exports.UNAUTHORIZED_ACCESS = UNAUTHORIZED_ACCESS;
function _default(role) {
  return (request) => {
    const session = request.attachment('session');
    if (!session) {
      return _Exception.default.reject(UNAUTHORIZED_ACCESS, 401);
    }
    if (session.isExpired()) {
      return _Exception.default.reject(SESSION_IS_EXPIRED, 401);
    }
    if (!(0, _lodash.isUndefined)(role)) {
      return request.app.getModel('User').
      findOne({ _id: session.user }, 'role').
      then((user) => {
        if (!user || user.role !== role) {
          return _Exception.default.reject(UNAUTHORIZED_ACCESS, 401);
        }
      });
    }
  };
}