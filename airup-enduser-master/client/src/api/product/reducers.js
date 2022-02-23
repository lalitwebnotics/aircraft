import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import keyBy from 'lodash/keyBy';
import { handleActions } from 'redux-actions';

import {
  CATEGORIES,
  CATEGORY,
  CERTIFICATE,
  PRODUCT,
  PRODUCTS,
  PRODUCT_CHANGES,
  PRODUCT_COUNT_FOR_CERTIFICATE,
  PRODUCTS_COUNT_ALL,
  PRODUCTS_COUNT_AIRCRAFT_MAKES,
  PRODUCTS_COUNT_AIRCRAFT_MODELS,
  PRODUCTS_COUNT_APPROVED_AIRCRAFT_MAKES,
  PRODUCTS_COUNT_APPROVED_AIRCRAFT_MODELS,
  PRODUCTS_COUNT_CATEGORIES,
  PRODUCTS_TRACKED,
  PRODUCTS_MODELS,
  ALERT_HISTORY
} from './actions';
import { createReducers, createState } from '../../store';

/**
 * Product state
 */
export const productState = {
  ...createState('categories'),
  ...createState('category'),
  ...createState('certificate'),
  ...createState('product'),
  ...createState('products'),
  ...createState('productCountForCertificates'),
  ...createState('productChanges'),
  ...createState('countAll'),
  ...createState('countAircraftMakes'),
  ...createState('countAircraftModels'),
  ...createState('countCategories'),
  ...createState('countApprovedAircraftMakes'),
  ...createState('countApprovedAircraftModels'),
  ...createState('tracked'),
  ...createState('alertHistory')
};

/**
 * Route reducer
 */
export default handleActions({
  ...createReducers(CATEGORIES, 'categories'),
  ...createReducers(CATEGORY, 'category'),
  ...createReducers(CERTIFICATE, 'certificate'),
  ...createReducers(PRODUCT, 'product'),
  ...createReducers(PRODUCT_COUNT_FOR_CERTIFICATE, 'productCountForCertificates'),
  ...createReducers(PRODUCTS, 'products'),
  ...createReducers(PRODUCT_CHANGES, 'productChanges'),
  ...createReducers(PRODUCTS_MODELS, 'products'),
  ...createReducers(PRODUCTS_COUNT_ALL, 'countAll'),
  ...createReducers(PRODUCTS_COUNT_AIRCRAFT_MAKES, 'countAircraftMakes'),
  ...createReducers(PRODUCTS_COUNT_AIRCRAFT_MODELS, 'countAircraftModels'),
  ...createReducers(PRODUCTS_COUNT_APPROVED_AIRCRAFT_MAKES, 'countApprovedAircraftMakes'),
  ...createReducers(PRODUCTS_COUNT_APPROVED_AIRCRAFT_MODELS, 'countApprovedAircraftModels'),
  ...createReducers(PRODUCTS_COUNT_CATEGORIES, 'countCategories'),
  ...createReducers(PRODUCTS_TRACKED, 'tracked'),
  ...createReducers(ALERT_HISTORY, 'alertHistory'),
  PRODUCTS_RELOAD_SUCCESS: onProductsReloadSuccess
},
productState);

/**
 * On products reload success
 */
export function onProductsReloadSuccess(state, { payload }) {
  if (isEmpty(payload) || !payload.count || !payload.results || !payload.results.length) {
    return state;
  }
  const data = payload.results.find((result) => (result._id === state.product.data._id));
  return {
    ...state,
    product: {
      ...state.product,
      ...(!data ? {} : {
        data
      })
    },
    products: {
      ...state.products,
      data: {
        ...state.products.data,
        ...keyBy(payload.results.filter((result) => (
          !isUndefined(state.products.data[result._id])
        )), '_id')
      }
    },
    productChanges: {
      ...state.productChanges,
      data: {
        ...state.productChanges.data,
        ...keyBy(payload.results.filter((result) => (
          !isUndefined(state.productChanges.data[result._id])
        )), '_id')
      }
    },
    tracked: {
      ...state.tracked,
      data: {
        ...state.tracked.data,
        ...keyBy(payload.results.filter((result) => (
          !isUndefined(state.tracked.data[result._id])
        )), '_id')
      }
    }
  };
}
