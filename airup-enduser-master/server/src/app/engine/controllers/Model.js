import Controller from '../../../modules/Controller';
import { permalink } from '../../../modules/utils';

/**
 * Populate fields
 */
export const populate = [
  'engine_make'
];

/**
 * Engine model controller
 */
export default class EngineModel extends Controller {

  /**
   * Use EngineModel model
   */
  model = 'EngineModel';

  /**
   * Validators
   */
  validators = {
    create: {
      name: ['required'],
      engine_make: ['required'],
    },
    update: {
      name: ['required']
    }
  };

  /**
   * Create single
   */
  create(request) {
    return this.validate('create', request).then(({ name, engine_make, cylinders, type, certificate }) => {
      const safe = permalink(name);

      if(type.length == 0){
        type = "carbureted";
      }

      this.getEngineMake(engine_make).then(engineMake => {
        return this.getModel().countDocuments({
          safe
        }).then((count) => {
          return this.getModel().create({
            name,
            type,
            cylinders,
            certificate,
            engine_make: engineMake,
            permalink: safe + ((count > 0) ? ('-' + (count + 1)) : ''),
            safe
          });
        });
      })
    });
  }

  /**
   * get engine for aircraft model
   */
  getEngineMake(engine_make){
    return this.getModel('EngineMake').findById(engine_make);
  }

  /**
   * Delete single
   */
  delete(request) {
    return this.getModel()
      .findByIdAndRemove(request.params.engine_model_id)
      .then(() => ({
        success: true
      }));
  }

  /**
   * Get multiple
   */
  multiple(request) {
    return this.paginate(request, {
      filters: (filters) => {
        if (request.query.name) {
          filters.name = {
            $regex: new RegExp(request.query.name, 'i')
          };
        }
        return filters;
      },
      populate
    });
  }

  /**
   * Get single
   */
  single(request) {
    return this.getSingle(request, 'aircraft_model_id', {
      populate
    });
  }

  /**
   * Update single
   */
  update(request) {
    const id = request.params.engine_model_id;
    return this.validate('update', request).then(({ name, type, cylinders, certificate, engine_make }) => {

      const safe = permalink(name);
      
      return this.getModel().countDocuments({
        _id: {
          $ne: id
        },
        safe
      }).then((count) => {
        return this.getModel().findByIdAndUpdate(id, {
          name,
          type,
          cylinders,
          certificate,
          engine_make,
          permalink: safe + ((count > 0) ? ('-' + (count + 1)) : ''),
          safe
        });
      });
    });
  }
}
