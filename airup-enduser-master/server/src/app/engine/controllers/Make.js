import { permalink } from '../../../modules/utils';
import Controller from '../../../modules/Controller';

/**
 * Engine make controller
 */
export default class EngineMake extends Controller {

  /**
   * Use EngineMake model
   */
  model = 'EngineMake';

  /**
   * Sanitizers
   */
  sanitizers = {
    create: {
      name: ['trim']
    },
    update: {
      name: ['trim']
    }
  };

  /**
   * Validators
   */
  validators = {
    create: {
      name: ['required']
    },
    update: {
      name: ['required']
    }
  };

  /**
   * Create single
   */
  create(request) {
    return this.validate('create', request).then(({ name }) => {
      const safe = permalink(name);
      return this.getModel().countDocuments({
        safe
      }).then((count) => {
        return this.getModel().create({
          name,
          permalink: safe + ((count > 0) ? ('-' + (count + 1)) : ''),
          safe
        });
      });
    });
  }

  /**
   * Delete single
   */
  delete(request) {
    return this.getModel()
      .findByIdAndRemove(request.params.engine_make_id)
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
      }
    });
  }

  /**
   * Get single
   */
  single(request) {
    return this.getSingle(request, 'engine_make_id');
  }

  /**
   * Update single
   */
  update(request) {
    const id = request.params.engine_make_id;
    return this.validate('update', request).then(({ name }) => {
      const safe = permalink(name);
      return this.getModel().countDocuments({
        _id: {
          $ne: id
        },
        safe
      }).then((count) => {
        return this.getModel().findByIdAndUpdate(id, {
          name,
          permalink: safe + ((count > 0) ? ('-' + (count + 1)) : ''),
          safe
        });
      });
    });
  }
}
