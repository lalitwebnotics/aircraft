import { delay } from '../../../modules/utils';

/**
 * Throttle middleware
 */
export default function throttle(timeout = 0) {
  return () => {
    return new Promise((resolve) => {
      setTimeout(resolve, parseInt(timeout));
    });
  };
}
