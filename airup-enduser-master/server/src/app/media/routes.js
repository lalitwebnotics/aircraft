import { use } from '../../modules/Controller';

/**
 * Media routes
 */
export default {
  '/media': {
    controller: 'media',
    ...use('create', 'multiple'),
    '/:media_id': {
      ...use('delete', 'single', 'update')
    },
    '/:media_path': {
      '/:media_file': {
        get: 'file'
      }
    }
  }
};
