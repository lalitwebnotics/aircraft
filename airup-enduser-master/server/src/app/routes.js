import config from '../config';
import aircraft from './aircraft/routes';
import certificate from './certificate/routes';
import engine from './engine/routes';
import manufacturer from './manufacturer/routes';
import media from './media/routes';
import product from './product/routes';
import user from './user/routes';
import rebate from './rebate/routes';
import retailer from './retailer/routes';
import retailer_products from './retailer_products/routes';

export const version = 'v' + config.app.version.split('.')[0];

export default {
  '/api': {
    middleware: [
      `throttle:${config.app.throttle || 0}`,
      'authorize'
    ],
    ['/' + version]: {
      ...aircraft,
      ...certificate,
      ...engine,
      ...manufacturer,
      ...rebate,
      ...retailer,
      ...retailer_products,
      ...media,
      ...product,
      ...user
    }
  }};
