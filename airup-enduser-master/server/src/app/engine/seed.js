import { keys } from 'lodash';
import { permalink, queue } from '../../modules/utils';
import { engine_makes, engine_models } from '../../../data/data.json';

/**
 * Seed engine
 */
export default ({ getModel, mongoose: { connection }, seeded }) => queue([
  /**
   * Seed engine makes
   */
  () => {
    console.log('Seeding engine make(s)...');
    const EngineMake = getModel('EngineMake'),
          { collectionName } = EngineMake.collection;
    seeded.EngineMake = {};
    return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
      return queue(engine_makes.map(({ id, name }) => {
        const safe = permalink(name);
        return () => EngineMake.create({
          name,
          permalink: safe,
          safe
        }).then((make) => {
          return seeded.EngineMake[id] = make;
        });
      })).then(() => {
        console.log('Seeded ' + keys(seeded.EngineMake).length + ' engine make(s)');
      });
    });
  },
  /**
   * Seed engine models
   */
  () => {
    console.log('Seeding engine model(s)...');
    const EngineModel = getModel('EngineModel'),
          { collectionName } = EngineModel.collection;
    seeded.EngineModel = {};
    return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
      return queue(engine_models.map(({
        certificate_id,
        cylinders,
        engine_make_id,
        id,
        name,
        type
      }) => {
        return () => EngineModel.create({
          certificate: (seeded.Certificate[certificate_id] || {})._id,
          cylinders,
          engine_make: (seeded.EngineMake[engine_make_id] || {})._id,
          name,
          permalink: permalink(name),
          type
        }).then((model) => {
          return seeded.EngineModel[id] = model;
        });
      })).then(() => {
        console.log('Seeded ' + keys(seeded.EngineModel).length + ' engine model(s)');
      });
    });
  }
]);
