import { use } from '../../modules/Controller';

/**
 * Media routes
 */
export default {
  '/certificates': {
    controller: 'certificate',
    ...use('create', 'multiple'),
    '/upload': {
      post: 'uploadPdf',
    },
    '/pdf/:certificate_id': {
      get: 'viewCertificate'
    },
    '/:certificate_id': {
      ...use('delete', 'single', 'update')
    }
  }
};
