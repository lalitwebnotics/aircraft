import { createAction } from 'redux-actions';

export const RETAILERS_FOR_PRODUCT = 'RETAILERS_FOR_PRODUCT';
export const PRODUCTS_FOR_RETAILER = 'PRODUCTS_FOR_RETAILER';

export const getRetailersForProduct = createAction(RETAILERS_FOR_PRODUCT);
export const getProductsForRetailer = createAction(PRODUCTS_FOR_RETAILER);
