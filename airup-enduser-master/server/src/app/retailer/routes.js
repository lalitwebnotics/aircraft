import { use } from '../../modules/Controller';

/**
 * Rebate routes
 */
export default {
  '/retailers': {
    controller: 'retailer',
    ...use('create', 'multiple'),
    '/upload': {
      post: 'uploadLogo',
    },
    '/:retailer_id': {
      ...use('delete', 'single', 'update')
    }
  }
};
