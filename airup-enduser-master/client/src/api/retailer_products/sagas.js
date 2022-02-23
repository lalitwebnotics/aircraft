import { async } from '../../store';
import { retailerProduct } from '../';
import {
  RETAILERS_FOR_PRODUCT,
  PRODUCTS_FOR_RETAILER
} from './actions';

export default [
  ...async(RETAILERS_FOR_PRODUCT, retailerProduct.getRetailersForProduct),
  ...async(PRODUCTS_FOR_RETAILER, retailerProduct.getProductsForRetailer)
];
