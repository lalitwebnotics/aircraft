import { keys, range, random } from 'lodash';
import moment from 'moment';
import { permalink, queue } from '../../modules/utils';
import { aircraft_makes, aircraft_models } from '../../../data/data.json';

/**
 * Seed aircraft
 */
export default ({ getModel, mongoose: { connection }, seeded }) => queue([
  /**
   * Seed aircraft
   */
  () => {
    console.log('Emptying aircraft(s)...');
    const Aircraft = getModel('Aircraft'),
          { collectionName } = Aircraft.collection;
    seeded.Aircraft = {};
    return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
      console.log('Emptied aircraft(s)');
    });
  },
  /**
   * Seed aircraft makes
   */
  () => {
    console.log('Seeding aircraft make(s)...');
    const AircraftMake = getModel('AircraftMake'),
          { collectionName } = AircraftMake.collection;
    seeded.AircraftMake = {};
    return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
      return queue(aircraft_makes.map(({ id, name }) => {
        const safe = permalink(name);
        return () => AircraftMake.create({
          name,
          permalink: safe,
          safe
        }).then((make) => {
          return seeded.AircraftMake[id] = make;
        });
      })).then(() => {
        console.log('Seeded ' + keys(seeded.AircraftMake).length + ' aircraft make(s)');
      });
    });
  },
  /**
   * Seed aircraft models
   */
  () => {
    console.log('Seeding aircraft model(s)...');
    const AircraftModel = getModel('AircraftModel'),
          { collectionName } = AircraftModel.collection;
    seeded.AircraftModel = {};
    return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
      return queue(aircraft_models.map(({
        aircraft_make_id,
        certificate_id,
        engine_model_id,
        id,
        name,
        turbo
      }) => {
        const max = parseInt(moment().format('Y')) + 1,
              low = random(1950, max),
              high = random(low, max),
              safe = permalink(name);
        return () => AircraftModel.create({
          aircraft_make: (seeded.AircraftMake[aircraft_make_id] || {})._id,
          certificate: (seeded.Certificate[certificate_id] || {})._id,
          engine_model: (seeded.EngineModel[engine_model_id] || {})._id,
          name,
          permalink: safe,
          safe,
          turbo,
          years: range(low, high)
        }).then((model) => {
          return seeded.AircraftModel[id] = model;
        });
      })).then(() => {
        console.log('Seeded ' + keys(seeded.AircraftModel).length + ' aircraft model(s)');
      });
    });
  }
]);
