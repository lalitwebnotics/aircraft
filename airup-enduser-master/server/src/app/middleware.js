import authenticate from './user/middleware/authenticate';
import authorize from './user/middleware/authorize';
import throttle from './core/middleware/throttle';

export default {
  authenticate,
  authorize,
  throttle
};
