import { extend, isFunction, isUndefined, pick, result, uniq, values } from 'lodash';
import { Types } from 'mongoose';

import Controller from '../../../modules/Controller';
import { updates } from '../models/Track';
import { permalink } from '../../../modules/utils';
import { constants } from 'crypto';
import path from 'path';
import Exception from '../../../modules/Exception';
import fs from 'fs'

export const INVALID_PRODUCT = 'Invalid product';
import startCron from '../../../modules/cron'

import AwsSES from '../../../modules/AwsSES'

/**
 * Populate fields
 */
export const populate = [
  'categories',
  {
    path: 'retailers',
    populate: 'logo'
  },
  {
    path: 'certificates',
    populate: 'aml_pdf'
  },
  'media',
  {
    path: 'manufacturer',
    populate: [
      'address',
      'contacts'
    ]
  },
  {
    path: 'rebate',
    populate: [
      'manufacturer'
    ]
  }
];

/**
 * Product controller
 */
export default class Product extends Controller {

  /**
   * Use Product model
   */
  model = 'Product';

  /**
   * Validators
   */
  validators = {
    create: {
      name: ['required'],
      manufacturer: ['required'],
      part: ['required'],
      price: ['required'],
      // certificate: ['required']
    },
    update: {
      name: ['required'],
      manufacturer: ['required'],
      part: ['required'],
      // price: ['required'],
      // certificate: ['required']
    },
    file: {
      file: ['required']
    }
  };

  /**
   * Count products
   */
  count({ query }) {
    return this.getFilters(query).then((filters) => {
      return this.getModel().countDocuments(filters);
    });
  }

  notify() {
    //send notifications mail
    startCron(this.app, true);
  }

  /**
   * Count multiple
   */
  countMultiple(request) {
    const { query } = request,
      fields = ['aircraft_make', 'aircraft_model'];
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (!isUndefined(query[field + 's'])) {
        return Promise.all(uniq(query[field + 's'].split(',')).map((value) => {
          return this.count({
            query: {
              ...query,
              [field]: value
            }
          }).then((count) => ({
            [value]: count
          }));
        })).then((results) => {
          return extend({}, ...results)
        });
      }
    }
    return request.next();
  }

  /**
   * Create single
   */
  create(request) {
    return this.validate('create', request).then(({ name, part, price, certificates, retailers, manufacturer, rebate }) => {
      const safe = permalink(name);

      try {
        return this.getModel().countDocuments({
          safe
        }).then((count) => {
          return this.getModel().create({
            name,
            part,
            price,
            rebate,
            retailers,
            old_price: price,
            manufacturer,
            certificates,
            permalink: safe + ((count > 0) ? ('-' + (count + 1)) : ''),
            safe
          });
        });
      } catch (error) {
        return Exception.reject(error, 500);
      }
    });
  }

  /**
   * Delete single
   */
  async delete(request) {

    const product = await this.getModel()
      .findById(request.params.product_id, 'certificate');

    if (!product) {
      return Exception.reject(INVALID_PRODUCT, 400);
    }
    if (product.certificate) {
      await this.getModel('Certificate')
        .findByIdAndDelete(product.certificate._id);
    }

    await this.getModel().findByIdAndDelete(product._id);

    return {
      success: true
    };
  }

  /**
   * Extend product updates
   */
  extendUpdates(session, product) {
    if (!session || !session.user) {
      return product;
    }
    if (isFunction(product.toObject)) {
      product = product.toObject();
    }
    return this.getModel('Track').findOne({
      product: product._id,
      user: session.user
    }).then((track) => {
      return {
        ...product,
        updates: (track || {}).updates || 0
      };
    });
  }

  /**
   * Get filters
   */
  async getFilters(query, filters = {}) {
    const AircraftMake = this.app.getModel('AircraftMake'),
      CategoryModel = this.app.getModel('Category'),
      CertificateModel = this.app.getModel('Certificate'),
      ManufacturerModel = this.app.getModel("Manufacturer"),
      AircraftModel = this.app.getModel('AircraftModel');

    if (!isUndefined(query.created_at)) {
      filters['created_at'] = query.created_at;
    }

    if (!isUndefined(query.aircraft_make)) {
      let id = query.aircraft_make;
      if (!Types.ObjectId.isValid(id)) {
        const aircraft_make = await AircraftMake.findOne({ permalink: id }, '_id');
        if (!aircraft_make) {
          throw new Error('Aircraft make not found');
        }
        id = aircraft_make._id;
      }
      if (Boolean(query.both)) {
        filters['$or'] = [{
          aircraft_makes: id
        }, {
          approved_aircraft_makes: id
        }]
      } else {
        filters[(Boolean(query.approved) ? 'approved_' : '') + 'aircraft_makes'] = id;
      }
    }
    if (!isUndefined(query.category)) {
      let id = query.category;
      if (!Types.ObjectId.isValid(id)) {
        const category = await CategoryModel.findOne({ permalink: id }, '_id');
        if (!category) {
          throw new Error('Category not found');
        }
        id = category._id;
      }
      filters['categories'] = id;
    }

    if (!isUndefined(query.manufacturer)) {
      let id = query.manufacturer;
      if (!Types.ObjectId.isValid(id)) {
        const manufacturer = await ManufacturerModel.findOne({ permalink: id }, '_id');
        if (!manufacturer) {
          throw new Error('Manufacturer not found');
        }
        id = manufacturer._id;
      }
      filters['manufacturer'] = id;
    }

    if (!isUndefined(query.aircraft_model)) {
      let id = query.aircraft_model;
      if (!Types.ObjectId.isValid(query.aircraft_model)) {
        const aircraft_model = await AircraftModel.findOne({ permalink: id }, '_id');
        if (!aircraft_model) {
          throw new Error('Aircraft model not found');
        }
        id = aircraft_model._id;
      }
      if (Boolean(query.both)) {
        filters['$or'] = [{
          aircraft_models: id
        }, {
          approved_aircraft_models: id
        }]
      } else {
        filters[(Boolean(query.approved) ? 'approved_' : '') + 'aircraft_models'] = id;
      }
    }

    [
      'aircraft_make',
      'aircraft_model',
      'approved_aircraft_make',
      'approved_aircraft_model',
      'categories',
      'created_at'
    ].forEach((field, i) => {
      if (query[field] === '1') {
        if (i) {
          filters[field + 's'] = {
            $exists: true,
            $ne: null,
            $not: {
              $size: 0
            }
          };
        } else {
          filters[field] = {
            $ne: null
          };
        }
      }
    });

    if (query.name) {
      filters.name = {
        $regex: new RegExp(query.name, 'i')
      };
    }

    if (query.created_at) {
      filters.created_at = {
        $gte: query.created_at
      };
    }

    if (query.certificate) {
      const Certificates = await CertificateModel.find({ ctype: { $in: query.certificate.split(',') } });

      filters.certificates = {
        $in: Certificates.map(x => x._id)
      }
    }

    if (query.manufacturers) {

      let manArray = query.manufacturers.split(",");

      filters.manufacturer = {
        $in: manArray
      }
    }

    if (query.productId) {
      filters.productId = {
        $in: query.productId.split(",")
      }
    }

    if (query.aircraft_makes) {
      let manArray = query.aircraft_makes.split(",");
      filters.aircraft_makes = {
        $in: manArray
      }
    }

    if (query.aircraft_models) {
      let manArray = query.aircraft_models.split(",");
      filters.aircraft_models = {
        $in: manArray
      }
    }

    if (query.approved_aircraft_makes) {
      let manArray = query.aircraft_makes.split(",");
      filters.approved_aircraft_makes = {
        $in: manArray
      }
    }

    if (query.approved_aircraft_models) {
      let manArray = query.approved_aircraft_models.split(",");
      filters.approved_aircraft_models = {
        $in: manArray
      }
    }

    return filters;
  }

  async deleteImages(request) {
    var productObj = await this.getModel("Product").findById(request.params.id);

    var media = productObj.media;

    var path = "data/data/media/";

    for (var i = 0; i < media.length; i++) {
      this.getModel("Media").findById(media[i]).then(media => {


        if (!media.name.includes("photos")) {
          path += "photos/";
        }

        try {
          fs.unlinkSync(path + media.name);
          //file removed
        } catch (err) {
          console.error(err)
        }
      });
    }

    productObj.media = [];
    productObj.save();

  }

  uploadImage(request, res) {
    return this.validate('image', request).then(({ file, id }) => {

      let image = request.req.files.file;
      let name = image.name;
      let type = image.mimetype;

      try {
        // Use the mv() method to place the file somewhere on your server
        image.mv('data/data/media/photos/' + name, function (err) {
          if (err)
            return Exception.reject(err, 500);
        });
      } catch (err) {
        console.log(err)
      }

      this.getModel('Media').create({
        name,
        type
      }).then(media => {
        this.getModel().findById(request.body.id, function (err, doc) {
          doc.media.push(media);
          doc.save();
        });
      })

    })

  }

  /**
   * Get multiple products
   */
  getMultiple(request, query) {

    return this.getFilters(query).then((filters) => {
      return this.paginate({ query }, {
        filters,
        populate
      });
    }).then((result) => {
      const session = request.attachment('session');
      if (!session || !session.user) {
        return result;
      }
      return Promise.all(result.results.map((product) => (
        this.extendUpdates(session, product)
      ))).then((results) => ({
        ...result,
        results
      }));
    });
  }

  /**
   * Get product count for certificates for filters
   */
  async getProductCountForCertificates(request) {
    try {
      const filters = await this.getFilters(request.query);
      const result = await this.getModel().find(filters, { _id: 1 }).lean();
      const certificates = await this.app.getModel('Certificate').find({
        ctype: {
          $in: [
            'STC',
            'TSO',
            'PMA',
            'TCCA',
            'EASA',
            'No-STC'
          ]
        }
      }).lean();
      const certResult = {
        'STC': 0,
        'TSO': 0,
        'PMA': 0,
        'TCCA': 0,
        'EASA': 0,
        'No-STC': 0
      };
      await Promise.all(certificates.map(cert => this.getModel().count({
        _id: { $in: result.map(pr => pr._id) },
        certificates: { $in: [cert._id] }
      }).then((count) => {
        certResult[cert.ctype] += count;
      })));

      return certResult;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get multiple
   */
  multiple(request) {
    return this.getMultiple(request, request.query);
  }

  getAllProductsModel = async (req) => {
    try {

      const {
        aircraft_model
      } = req.query;

      let airCraftModelInfo = await this.getModel('AircraftModel').findOne({
        permalink: aircraft_model
      }).lean();

      if (!airCraftModelInfo) {
        throw {
          error: true,
          message: 'InValid id'
        }
      }

      let productDetails = await this.getModel('Product').find({
        aircraft_models: { $elemMatch: { $eq: airCraftModelInfo._id } }
      })
        .populate('media')
        .lean();

      req.send({
        count: productDetails.length,
        results: productDetails
      })

    } catch (err) {
      req.status(500).send(err)
    }
  };

  async getPreviousChanges(req) {
    try {
      const {
        product_id: productId
      } = req.params;

      const productChanges = await this.getModel('ProductChanges').find({
        productId,
      })
        .sort('-created_at')
        .lean();

      const rebates = [];

      productChanges.forEach(pc => {
        if (pc.oldValues.rebate && rebates.indexOf(pc.oldValues.rebate.toString()) == -1) {
          rebates.push(pc.oldValues.rebate.toString());
        }
        if (pc.newValues.rebate && rebates.indexOf(pc.newValues.rebate.toString()) == -1) {
          rebates.push(pc.newValues.rebate.toString());
        }
      });
      const rebateChanges = await this.getModel('RebateChanges').find({
        rebate: { $in: rebates },
        $or: [{
          newAmount: { $exists: true }
        }, {
          pdf: { $exists: true }
        }]
      })
        .populate('pdf')
        .sort('-created_at')
        .lean()

      let results = productChanges.slice(0, 3).map(pc => ({ type: 'product', ...pc }));
      results = results.concat(rebateChanges.slice(0, 6 - results.length).map(rc => ({ type: 'rebate', ...rc })));
      if (results.length < 6) {
        results = results.concat(productChanges.splice(3, 6 - results.length).map(pc => ({ type: 'product', ...pc })));
      }

      results.sort((change1, change2) => change2.created_at.getTime() - change1.created_at.getTime());

      return {
        results
      };
    } catch (err) {
      throw err;
    }
  };

  /**
   * Get single
   */
  single(request) {
    return this.getSingle(request, 'product_id', {
      populate
    }).then((product) => (
      this.extendUpdates(request.attachment('session'), product)
    ));
  }

  /**
   * Track
   */
  track(request) {
    const Track = this.getModel('Track');
    const { user } = request.attachment('session');
    const body = {
      ...request.body
    };
    if (body.track && isUndefined(body.updates)) {
      body.updates = values(updates).reduce((total, value) => (total + value), 0);
    }
    return (body.track ? Promise.all((body.id || []).map((product) => (
      Track.updateOne({
        user,
        product
      }, {
        user,
        product,
        updates: body.updates
      }, {
        upsert: true
      })
    ))) : Track.deleteMany({
      user,
      product: {
        $in: body.id || []
      }
    })).then(() => ({
      success: true
    }));
  }

  /**
   * Get tracked
   */
  tracked(request) {
    return this.getModel('Track').find({
      user: request.attachment('session').user
    }, 'product').then((tracked) => {
      const id = (tracked || []).map((track) => track.product.toString()).join(',');
      return this.getMultiple(request, {
        ...(request.query || {}),
        id
      });
    });
  }

  /**
   * Get Alert History for tracked products
   */
  async alertHistory(request) {
    const query = request.query;
    const tracked = await this.getModel('Track').find({
      user: request.attachment('session').user
    }, 'product')
    const productId = (tracked || []).map((track) => track.product.toString());
    return this.paginate({ query }, {
      filters: {
        productId
      }
    }, null, 'ProductChanges')
      .then((result) => result);
  }

  /**
   * Update single
   */
  async update(request) {
    const id = request.params.product_id;

    const foundProduct = await this.getModel().findById(id);

    return this.validate('update', request).then(({ name, part, price, manufacturer, retailers, certificates, rebate }) => {
      const safe = permalink(name);

      var old_price = foundProduct.price;

      for (var i = 0; i < certificates.length; i++) {
        if (foundProduct.certificates && certificates[i] && !foundProduct.certificates.includes(certificates[i]._id)) {
          this.triggerEmailNotification(certificates[i], foundProduct)
        }
      }

      return this.getModel().countDocuments({
        _id: {
          $ne: id
        },
        safe
      }).then((count) => {
        const oldValues = pick(foundProduct.toObject(), [
          'manufacturer',
          'certificates',
          'name',
          'part',
          'rebate',
          'retailers',
          'price',
          'permalink',
          'safe'
        ]);
        this.getModel('ProductChanges').create({
          newValues: {
            manufacturer: Types.ObjectId(manufacturer._id),
            certificates,
            name,
            part,
            rebate: Types.ObjectId(rebate._id),
            retailers,
            price,
            permalink: safe + ((count > 0) ? ('-' + (count + 1)) : ''),
            safe
          },
          oldValues,
          productId: id
        });
        return this.getModel().findByIdAndUpdate(id, {
          manufacturer,
          certificates,
          name,
          part,
          old_price,
          rebate,
          retailers,
          old_product: JSON.stringify({
            name: foundProduct.name,
            part: foundProduct.part,
            price: foundProduct.price,
          }),
          price,
          permalink: safe + ((count > 0) ? ('-' + (count + 1)) : ''),
          safe
        });
      });
    });
  }

  /**
   * Create product certificate
   */
  createCertificate(reference) {
    const certificateSafe = permalink(reference);

    return this.getModel('Certificate').create({
      reference: reference,
      permalink: certificateSafe,
      safe: certificateSafe,
    })
  }

  /**
   * find manufacturer by id
   */
  findManufacturerById(manufacturerId) {
    return this.getModel('Manufacturer').findById(manufacturerId);
  }

  test(res) {

  }

  triggerEmailNotification(certificate, product) {

    const ses = new AwsSES();
    ses.triggerCertificateProductUpdate(this, certificate, product);
  }

}
