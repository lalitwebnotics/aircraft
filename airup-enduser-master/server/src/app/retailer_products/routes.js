import { use } from '../../modules/Controller';

/**
 * Rebate routes
 */
export default {
  '/retailer-products': {
    controller: 'retailerProducts',
    '/retailers/:product_id': {
      ...use('multiple')
    }
  }
};
