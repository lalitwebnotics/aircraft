import { join } from 'path';
import Controller from '../../../modules/Controller';
import Exception from '../../../modules/Exception';

export const RESOURCE_NOT_FOUND = 'Resource not found';

/**
 * Core controller
 */
export default class Core extends Controller {

  /**
   * Handle 404
   */
  notFound() {
    return Exception.reject(RESOURCE_NOT_FOUND, 404);
  }
  
  sendBuild(request) {
    request.res.sendFile(join(__dirname,'../../../../../client/build/index.html'))
  }
}
