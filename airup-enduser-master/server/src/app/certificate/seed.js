import { keys } from 'lodash';
import path from 'path';
import { permalink, queue } from '../../modules/utils';
import { certificates } from '../../../data/data.json';
import { MEDIA_PATH } from '../media/seed';

/**
 * Seed certificate
 */
export default ({ getModel, mongoose: { connection }, seeded }) => queue([
  /**
   * Seed certificates
   */
  () => {
    console.log('Seeding certificate(s)...');
    const Certificate = getModel('Certificate'),
          Media = getModel('Media'),
          { collectionName } = Certificate.collection;
    seeded.Certificate = {};
    return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
      return queue(certificates.map(({ id, media, reference, type }) => () => {
        const copied = [],
              safe = permalink(reference);
        return queue(media.map(({ file_name, name, type }) => () => {
          return Media.copy({
            name: path.join('certificates', file_name),
            title: name,
            type
          }, MEDIA_PATH).then((file) => {
            copied.push(file._id);
            return file;
          });
        })).then(() => Certificate.create({
          media: copied,
          permalink: safe,
          reference,
          safe,
          type
        }).then((certificate) => {
          return seeded.Certificate[id] = certificate;
        }));
      })).then(() => {
        console.log('Seeded ' + keys(seeded.Certificate).length + ' certificate(s)');
      });
    });
  }
]);
