import { use, withMiddleware } from '../../modules/Controller';

/**
 * Aircraft routes
 */
export default {
  '/aircraft': {
    controller: 'aircraft.aircraft',
    ...withMiddleware(['authenticate'], 'create', 'multiple'),
    '/makes': {
      controller: 'aircraft.make',
      ...use('create', 'multiple'),
      '/:aircraft_make_id': {
        ...use('delete', 'single', 'update')
      }
    },
    '/models': {
      controller: 'aircraft.model',
      ...use('create', 'multiple'),
      '/random': {
        get: 'random'
      },
      '/:aircraft_model_id': {
        ...use('delete', 'single', 'update')
      }
    },
    '/:aircraft_id': {
      ...use('delete', 'single', 'update')
    }
  }
};

