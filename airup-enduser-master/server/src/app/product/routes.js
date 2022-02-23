import { use } from '../../modules/Controller';

/**
 * Product routes
 */
export default {
  '/products': {
    controller: 'product.product',
    ...use('create', 'multiple'),
    '/details': {
      get: 'getAllProductsModel'
    },
    '/count-by-certificates': {
      get: 'getProductCountForCertificates'
    },
    '/upload': {
      post: 'uploadImage',
    },
    '/notify': {
      post: 'notify',
    },
    '/images/:id': {
      delete: 'deleteImages',
    },
    '/count': {
      get: 'count',
      '/multiple': {
        get: 'countMultiple'
      }
    },
    '/test': {
      get: 'test',
    },
    '/categories': {
      controller: 'product.category',
      ...use('create', 'multiple'),
      '/random': {
        get: 'random'
      },
      '/:category_id': {
        ...use('delete', 'single', 'update')
      }
    },
    '/track': {
      middleware: [
        'authenticate'
      ],
      post: 'track'
    },
    '/tracked': {
      middleware: [
        'authenticate'
      ],
      get: 'tracked'
    },
    '/alert-history': {
      middleware: [
        'authenticate'
      ],
      get: 'alertHistory'
    },
    '/:product_id': {
      ...use('delete', 'single', 'update')
    },
    '/previous-changes/:product_id': {
      get: 'getPreviousChanges'
    }
  }
};
