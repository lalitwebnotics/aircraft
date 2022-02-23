import { keys, pick } from 'lodash';

import Controller from '../../../modules/Controller';
import Exception from '../../../modules/Exception';
import { updates } from '../models/Aircraft';
import AwsS3 from '../../aws';

/**
 * Error codes
 */
export const INVALID_AIRCRAFT_MODEL = 'Invalid aircraft model';

/**
 * Populate fields
 */
export const populate = [
  {
    path: 'aircraft_model',
    populate: [
      {
        path: 'certificates',
        populate: 'media'
      },
      {
        path: 'certificate',
        populate: 'media'
      },
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
    ]
  },
  'categories.category'
];

/**
 * Aircraft controller
 */
export default class Aircraft extends Controller {

  /**
   * Use Aircraft model
   */
  model = 'Aircraft';

  /**
   * Create single
   */
  async create(request) {
    const { user } = request.attachment('session'),
          body = request.body || {},
          model = await this.getModel('AircraftModel').findOne({ _id: body.aircraft_model });
    if (!model) {
      return Exception.reject(INVALID_AIRCRAFT_MODEL, 400);
    }

    const s3 = new AwsS3();

    let imageUrl = request.body.imageUrl;

    if(request.req.files.newImage) {
      let image = request.req.files.newImage;
      let name = image.name;

      imageUrl = `hangarImage/${Date.now()}_${request.attachments.session.toObject().user}_${(name || '').replace(/\s/g, '')}`;

      const data = await s3.uploadS3(imageUrl, image.data);
    }

    const isAircraftAdded = await this.getModel().findOne({
      aircraft_model: model._id,
      user: user._id,
      year: body.year || null,
    });

    if(isAircraftAdded) {
      return isAircraftAdded;
    }

    const aircraft =await this.getModel().create({
      aircraft_model: model._id,
      categories: [],
      frequency: updates.frequencies.daily,
      products: keys(updates.products).reduce((sum, key) => (
        sum + updates.products[key]
      ), 0),
      user: user._id,
      year: body.year || null,
      imageUrl,
      tailNumber: request.body.tailNumber
    });

    return aircraft;
  }

  /**
   * Delete single
   */
  delete(request) {
    return this.getModel().deleteOne({
      _id: request.params.aircraft_id
    }).then(() => ({
      success: true
    }));
  }

  /**
   * Get multiple
   */
  multiple(request) {
    return this.paginate(request, {
      populate,
      filters: {
        user: request.attachment('session').user
      },
      noLean: true
    });
  }

  /**
   * Get single
   */
  single(request) {
    return this.getSingle(request, 'aircraft_id');
  }

  /**
   * Update single
   */
  async update(request) {

    const s3 = new AwsS3();

    let imageUrl = request.body.imageUrl;

    if(request.req.files.newImage) {
      let image = request.req.files.newImage;
      let name = image.name;

      imageUrl = `hangarImage/${Date.now()}_${request.attachments.session.toObject().user}_${(name || '').replace(/\s/g, '')}`;

      const data = await s3.uploadS3(imageUrl, image.data);
    }

    return this.getModel()
      .findByIdAndUpdate(request.params.aircraft_id, pick({...request.body,
        imageUrl
      }, [
        'categories',
        'frequency',
        'products'
      ]))
      .then(() => ({
        success: true
      }));
  }
}
