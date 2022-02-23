import Controller from '../../../modules/Controller';
import AwsS3 from '../../aws';
import Exception from "../../../modules/Exception";

/**
 * Populate fields
 */
export const populate = [
  'product',
  {
    path: 'retailer',
    populate: 'logo'
  },
];


/**
 * Retailer controller
 */
export default class Retailer extends Controller {

  /**
   * Use Retailer model
   */
  model = 'RetailerProducts';

  /**
   * Validators
   */
  validators = {
  };

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
        if (request.params.retailer_id) {
          filters.retailer = request.params.retailer_id;
        }
        if (request.params.product_id) {
          filters.product = request.params.product_id;
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
    return this.getSingle(request, 'retailer_product_id');
  }

}
