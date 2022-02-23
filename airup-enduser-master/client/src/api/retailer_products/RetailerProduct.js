import { bind } from '../../utils';

/**
 * Retailer API
 */
export default class Retailer {

  constructor(api) {
    this.api = api;
    bind(this, [
      'getRetailersForProduct',
      'getProductsForRetailer'
    ]);
  }

  /**
   * Get Retailers for Product
   */
  getRetailersForProduct(id) {
    return this.api.get('retailer-products/retailers/' + id);
  }

  /**
   * Get Products for Retailer
   */
  getProductsForRetailer(id) {
    return this.api.get('retailer-products/products/' + id);
  }

}
