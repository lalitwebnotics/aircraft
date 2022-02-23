import fs from 'fs-extra';
import jwt from 'jsonwebtoken';
import path from 'path';

export const AUTHORIZATION_HEADER = 'Authorization';
export const KEYS_PATH = path.join(process.cwd(), 'keys');
export const JWT_ALGORITHM = 'RS256';

export const FAILED_TO_DECODE_TOKEN = 'Failed to decode token';
export const FAILED_TO_ENCODE_TOKEN = 'Failed to encode token';

/**
 * Keys
 */
export const keys = {
  private: fs.readFileSync(KEYS_PATH + '/jwt.key'),
  public: fs.readFileSync(KEYS_PATH + '/jwt.pub')
};

/**
 * Authorize
 */
export default function authorize() {
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
        if ((session.status === 'active') && session.isExpired()) {
          promises.push(session.expire());
        } else if (session.getDifference() >= config.api.refresh) {
          promises.push(session.reload().then(() => (
            encode(session._id, session.expires)
          )).then((authorization) => {
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
export function decode(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, keys.public, {
      algorithms: [JWT_ALGORITHM]
    }, (err, data) => {
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
export function encode(id, expiresIn = 60 * 30) {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, keys.private, {
      algorithm: JWT_ALGORITHM,
      expiresIn
    }, (err, token) => {
      if (err || !token) {
        reject(err || FAILED_TO_ENCODE_TOKEN);
      } else {
        resolve(token);
      }
    });
  });
}
