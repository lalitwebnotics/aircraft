import { use } from '../../modules/Controller';

/**
 * Manufacturer routes
 */
export default {
  '/manufacturers': {
    controller: 'manufacturer',
    ...use('create', 'multiple'),
    '/:manufacturer_id': {
      ...use('delete', 'single', 'update')
    }
  }
};
