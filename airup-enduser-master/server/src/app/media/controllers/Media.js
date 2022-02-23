import fileType from 'file-type';
import fs from 'fs-extra';
import path from 'path';
import readChunk from 'read-chunk';
import Controller from '../../../modules/Controller';

export const MEDIA_PATH = path.join(process.cwd(), 'media');

/**
 * Media controller
 */
export default class Media extends Controller {

  /**
   * Use Media model
   */
  model = 'Media';

  /**
   * Create single
   */
  create() {
    return Promise.resolve({});
  }

  /**
   * Delete single
   */
  delete() {
    return Promise.resolve({
      success: true
    })
  }

  /**
   * Get single file
   */
  file(request) {
    const { params, res } = request,
          { media_path, media_file } = params,
          filepath = path.join(MEDIA_PATH, media_path, media_file);
    if (!fs.existsSync(filepath)) {
      return request.next();
    }
    const stat = fs.statSync(filepath) || {},
          size = stat.size || 0,
          mime = ((fileType(readChunk.sync(filepath, 0, size)) || {}).mime || '').split('/'),
          meta = mime.filter((type) => !!type).join('/');
    res.setHeader('Content-Type', meta);
    res.setHeader('Content-Length', size);
    fs.createReadStream(filepath).pipe(res);
    return request;
  }

  /**
   * Get multiple
   */
  multiple(request) {
    return this.paginate(request);
  }

  /**
   * Get single
   */
  single(request) {
    return '';
    return this.getSingle(request, 'media_id');
  }

  /**
   * Update single
   */
  update() {
    return Promise.resolve({});
  }
}
