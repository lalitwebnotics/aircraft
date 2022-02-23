import { isEmpty, pick } from 'lodash';
import { permalink } from '../../../modules/utils';
import Controller from '../../../modules/Controller';

/**
 * Populate fields
 */
export const populate = [
  'manufacturer',
];


/**
 * Rebate controller
 */
export default class Rebate extends Controller {

  /**
   * Use Rebate model
   */
  model = 'Rebate';

  /**
   * Validators
   */
  validators = {
    create: {
      // amount: ['required'],
      manufacturer: ['required'],
      url: ['required'],
      expiry_date: ['required']
    },
    update: {
      // amount: ['required'],
      manufacturer: ['required'],
      url: ['required'],
      expiry_date: ['required']
    }
  };

  /**
   * Create single
   */
  create(request) {
    return this.validate('create', request).then(({ amount, manufacturer, url, expiry_date }) => {
      try {
        return this.getModel().create({
                amount,
                url,
                expiry_date,
                manufacturer,
        });
      } catch (error) {
        return Exception.reject(error, 500);
      }
    });
  }

  /**
   * Delete single
   */
  async delete(request) {
    await this.getModel().findByIdAndDelete(request.params.rebate_id);

    return {
      success: true
    };
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
    return this.getSingle(request, 'rebate_id');
  }

  /**
   * Update single
   */
  update(request) {
    const id = request.params.rebate_id;
    return this.validate('update', request).then(({ amount, manufacturer, url, expiry_date }) => {
      return this.getModel().findByIdAndUpdate(id, {
          amount,
          manufacturer,
          url,
          expiry_date,
        });
    });
  }
}
