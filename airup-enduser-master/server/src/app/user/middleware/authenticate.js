import { isUndefined } from 'lodash';

import Exception from '../../../modules/Exception';

export const SESSION_IS_EXPIRED = 'Session is expired';
export const UNAUTHORIZED_ACCESS = 'Unauthorized access';

/**
 * Authenticate middleware
 */
export default function(role) {
  return (request) => {
    const session = request.attachment('session');
    if (!session) {
      return Exception.reject(UNAUTHORIZED_ACCESS, 401);
    }
    if (session.isExpired()) {
      return Exception.reject(SESSION_IS_EXPIRED, 401);
    }
    if (!isUndefined(role)) {
      return request.app.getModel('User')
        .findOne({ _id: session.user }, 'role')
        .then((user) => {
          if (!user || (user.role !== role)) {
            return Exception.reject(UNAUTHORIZED_ACCESS, 401);
          }
        });
    }
  };
}
