import { use } from '../../modules/Controller';

/**
 * Engine routes
 */
export default {
  '/engines': {
    '/makes': {
      controller: 'engine.make',
      ...use('create', 'multiple'),
      '/:engine_make_id': {
        ...use('delete', 'single', 'update')
      }
    },
    '/models': {
      controller: 'engine.model',
      ...use('create', 'multiple'),
      '/:engine_model_id': {
        ...use('delete', 'single', 'update')
      }
    }
  }
};
