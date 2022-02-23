import Controller from '../../../modules/Controller';
import Exception from '../../../modules/Exception';
import { encode } from '../middleware/authorize';

/**
 * Error codes
 */
export const INVALID_USER_OR_PASSWORD = 'Invalid user or password';

/**
 * Populate fields
 */
export const populate = [
  'user'
];

/**
 * Session controller
 */
export default class Session extends Controller {

  /**
   * Use Session model
   */
  model = 'Session';

  /**
   * Login user
   */
  create(request) {
    const { password, remember } = request.body;
    return this.getModel('User').findAccount((request.body.user || '').toLowerCase(), '_id password').then((user) => {
      if (!user) {
        return Exception.reject(INVALID_USER_OR_PASSWORD, 400);
      }
      return user.check(password).catch(() => {
        return Exception.reject(INVALID_USER_OR_PASSWORD, 400);
      });
    }).then((user) => (
      this.getModel().create({
        expires: remember ? (60 * 60 * 24 * 30) : (60 * 30),
        user: user._id
      }).then(({ _id, expires }) => {
        return encode(_id, expires).then((token) => ({
          expires,
          token
        }));
      })
    ));
  }

  /**
   * Logout user
   */
  delete(request) {
    return request
      .attachment('session')
      .logout()
      .then(() => ({}));
  }

  /**
   * Get multiple
   */
  multiple(request) {
    return this.paginate(request, {
      populate
    });
  }

  /**
   * Get authorized user
   */
  single(request) {
    return this.getModel('User')
      .findOne({ _id: request.attachment('session').user }, '-password -token')
      .populate([
        'addresses',
        'contacts'
      ]);
  }
}
