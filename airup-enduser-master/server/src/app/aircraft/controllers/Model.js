import { sampleSize } from 'lodash';
import { Types } from 'mongoose';
import { permalink } from '../../../modules/utils';
import Controller from '../../../modules/Controller';
import Exception from '../../../modules/Exception';
import Aircraft from '../models/Aircraft';


/**
 *
 */
export const INVALID_AIRCRAFT_MAKE = 'Invalid aircraft make';
export const INVALID_ENGINE_MODEL = 'Invalid engine model';

/**
 * Populate fields
 */
export const populate = [
  {
    path: 'certificate',
    populate: 'media'
  },
  'certificates',
  'aircraft_make',
  {
    path: 'engine_model',
    populate: [
      'engine_make',
      // {
      //   path: 'certificate',
      //   populate: 'media'
      // }
    ]
  }
];

/**
 * Aircraft model controller
 */
export default class AircraftModel extends Controller {

  /**
   * Use AircraftModel model
   */
  model = 'AircraftModel';

  /**
   * Validators
   */
  validators = {
    create: {
      name: ['required'],
      // turbo: ['required'],
      aircraft_make: ['required'],
      engine_model: ['required'],
    },
    update: {
      name: ['required'],
      aircraft_make: ['required'],
      engine_model: ['required'],
    }
  };

  /**
   * Create single
   */
  create(request) {
    return this.validate('create', request).then(({ name, turbo, aircraft_make, certificates, engine_model, certificate, years }) => {
      const safe = permalink(name);

      this.getEngineModel(engine_model).then(engineModel =>{

        if(turbo.length == 0){
          turbo = 1;
        }

        if (!engineModel) {
          return Exception.reject(INVALID_ENGINE_MODEL, 400);
        }

        return this.getModel().countDocuments({
          safe
        }).then((count) => {
          return this.getModel().create({
            name,
            turbo,
            years,
            certificates,
            aircraft_make,
            engine_model: engineModel,
            permalink: safe + ((count > 0) ? ('-' + (count + 1)) : ''),
            safe
          });
       });
      })
    });
  }

  /**
   * get aircraft make for model
   */
  getAircraftMake(aircraft_make){
    return this.getModel('AircraftMake').findById(aircraft_make);
  }

  /**
   * get engine for aircraft model
   */
  getEngineModel(engine_model){
    return this.getModel('EngineModel').findById(engine_model);
  }

  /**
   * Delete single
   */
  delete(request) {
    return this.getModel()
      .findByIdAndRemove(request.params.aircraft_model_id)
      .then(() => ({
        success: true
      })).
      catch(() => {
         error: true
      });
  }

  /**
   * Get multiple
   */
  multiple(request) {
    return this.paginate(request, {
      populate,
      filters: (filters) => {
        if (Types.ObjectId.isValid(request.query.aircraft_make)) {
          filters.aircraft_make = request.query.aircraft_make;
        }
        if (request.query.name) {
          filters.name = {
            $regex: new RegExp(request.query.name, 'i')
          };
        }
        return filters;
      }
    });
  }

  /**
   * Random category ids
   */
  random({ query }) {
    return this.getModel().find({}, { select: '_id' }).then((results) => {
      return sampleSize(results.map(({ _id }) => _id), query.count || 20);
    });
  }

  /**
   * Get single
   */
  single(request) {
    return this.getSingle(request, 'aircraft_model_id', {
      populate
    });
  }

  /**
   * Update single
   */
  update(request) {

    const id = request.params.aircraft_model_id;

    return this.validate('update', request).then(({ name, turbo, aircraft_make, certificates, engine_model, years }) => {
      const safe = permalink(name);

      if(turbo.length == 0){
        turbo = 1;
      }

      return this.getModel().countDocuments({
        _id: {
          $ne: id
        },
        safe
      }).then((count) => {

        return Promise.all([
          this.getEngineModel(engine_model),
          this.getAircraftMake(aircraft_make)
        ]).then((responses) => {
          return this.getModel().findByIdAndUpdate(id, {
            aircraft_make: responses[1],
            engine_model: responses[0],
            name,
            years,
            certificates,
            turbo,
            permalink: safe + ((count > 0) ? ('-' + (count + 1)) : ''),
            safe
          });
        });

        return this.getModel().findByIdAndUpdate(id, {
          name,
          aircraft_make : {},
          engine_model : {},
          certificates,
          permalink: safe + ((count > 0) ? ('-' + (count + 1)) : ''),
          safe
        });
      });
    });
  }
}
