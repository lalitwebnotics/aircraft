import { sampleSize } from 'lodash';

import { permalink } from '../../../modules/utils';
import Controller from '../../../modules/Controller';


/**
 * Populate fields
 */
export const populate = [
  'rebate'
];


/**
 * Category controller
 */
export default class Category extends Controller {

  /**
   * Use Category model
   */
  model = 'Category';

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
    return this.validate('create', request).then(({ name, rebate }) => {
      const safe = permalink(name);
      return this.getModel().countDocuments({
        safe
      }).then((count) => {
        return this.getModel().create({
          name,
          rebate,
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
      .findByIdAndRemove(request.params.category_id)
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
   * Random category ids
   */
  random({ query }) {
    return this.getModel().find({}, { select: '_id' }).then((results) => {
      return sampleSize(results.map(({ _id }) => _id), query.count || 20);
    });
  }

  /**
   * Get single
   */
  single(request) {
    return this.getSingle(request, 'category_id');
  }

  /**
   * Update single
   */
  update(request) {
    const id = request.params.category_id;
    return this.validate('update', request).then(({ name, rebate }) => {
      const safe = permalink(name);
      return this.getModel().countDocuments({
        _id: {
          $ne: id
        },
        safe
      }).then((count) => {
        return this.getModel().findByIdAndUpdate(id, {
          name,
          rebate,
          permalink: safe + ((count > 0) ? ('-' + (count + 1)) : ''),
          safe
        });
      });
    });
  }
}
