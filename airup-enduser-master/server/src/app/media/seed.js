import path from 'path';
import { queue } from '../../modules/utils';

export const MEDIA_PATH = path.join(process.cwd(), 'data/media');

/**
 * Seed media
 */
export default ({ getModel, mongoose: { connection }, seeded }) => queue([
  /**
   * Truncate media collection
   */
  () => {
    console.log('Emptying media...');
    const Media = getModel('Media'),
          { collectionName } = Media.collection;
    seeded.Media = {};
    return connection.dropCollection(collectionName).catch(() => {
      return Promise.resolve();
    }).then((result) => {
      console.log('Emptied media');
      return result;
    })
  }
]);
