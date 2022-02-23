import { use } from '../../modules/Controller';

/**
 * User routes
 */
export default {
  '/sessions': {
    controller: 'user.session',
    ...use('create', 'multiple'),
    '/me': {
      middleware: [
        'authenticate'
      ],
      ...use('delete', 'single')
    }
  },
  '/advertisement': {
    controller: 'user.contactAdvertisement',
    ...use('create'),
  },
  '/users': {
    controller: 'user.user',
    '/send-mail': {
      get: 'sendMail',
    },
    get: {
      action: 'multiple',
      middleware: [
        'authenticate'
      ]
    },
    post: 'create',
    '/upload/profile': {
      middleware: [
        'authenticate'
      ],
      post: 'updateProfilePicture'
    },
    '/password': {
      post: 'resetPassword',
      put: 'updatePassword'
    },
    '/:user_id': {
      middleware: [
        'authenticate'
      ],
      '/update-account': {
        post: 'updateAccount',
      },
      ...use('delete', 'single', 'update')
    }
  },

};
