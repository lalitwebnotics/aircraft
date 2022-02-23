import { use } from '../../modules/Controller';

/**
 * Rebate routes
 */
export default {
  '/rebates': {
    controller: 'rebate',
    ...use('create', 'multiple'),
    '/:rebate_id': {
      ...use('delete', 'single', 'update')
    }
  }
};
