"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.populate = exports.default = void 0;var _Controller = _interopRequireDefault(require("../../../modules/Controller"));
var _utils = require("../../../modules/utils");
var _lodash = _interopRequireDefault(require("lodash"));
var _aws = _interopRequireDefault(require("../../aws"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


const {
  isFunction,
  isUndefined } =
_lodash.default;

/**
 * Populate fields
 */
const populate = [
'pdf',
'aml_pdf',
'products',
'aircraft_makes',
'aircraft_models',
'approved_aircraft_models'];


/**
 * Certificate controller
 */exports.populate = populate;
class Certificate extends _Controller.default {constructor(...args) {super(...args);_defineProperty(this, "model",




    'Certificate');_defineProperty(this, "validators",




    {
      create: {
        name: ['required', 'unique:Certificate'],
        ctype: ['required']
        // cid: ['required'],
        // aml_name: ['required'],
        // reference: ['required']
      },
      update: {
        name: ['required'],
        ctype: ['required']
        // cid: ['required'],
        // aml_name: ['required'],
        // reference: ['required']
      },
      pdf: {} });}




  /**
   * Create single
   */
  create(request) {
    return this.validate('create', request).then(({ name, ctype, cid, aml_name, products, aircraft_makes, aircraft_models, approved_aircraft_models }) => {
      const safe = (0, _utils.permalink)(name);

      return this.getModel().countDocuments({
        safe }).
      then((count) => {

        this.linkProductsWithAml(products, aircraft_makes, aircraft_models);

        return this.getModel().create({
          name,
          ctype,
          cid,
          aml_name,
          products,
          aircraft_makes,
          aircraft_models,
          permalink: safe + (count > 0 ? '-' + (count + 1) : ''),
          safe });

      });
    });
  }

  /**
   * Delete single
   */
  delete(request) {
    return this.getModel().
    findByIdAndRemove(request.params.certificate_id).
    then(() => ({
      success: true }));

  }

  /**
   * Get multiple
   */
  multiple(request) {
    return this.paginate(request, {
      populate,
      filters: (filters) => {
        if (request.query.type) {
          filters.ctype = request.query.type;
        }

        if (request.query.name) {
          filters.name = {
            $regex: new RegExp(request.query.name, 'i') };

        }
        return filters;
      } });

  }

  /**
   * Get single
   */
  single(request) {
    return this.getSingle(request, 'certificate_id', {
      populate });

  }

  async viewCertificate(request) {

    const permalink = request.req.params.certificate_id;
    const s3 = new _aws.default();
    const certificateDetails = await this.getModel().findOne({
      permalink }).

    populate('aml_pdf').
    lean();
    let pdfDetails = await s3.getPdfBuffer(certificateDetails.aml_pdf.full_path);

    request.args.res.contentType("application/pdf");
    request.args.res.send(pdfDetails);

    return pdfDetails;

  }

  uploadPdf(request, res) {
    return this.validate('pdf', request).then(({ file, id }) => {

      if (request.req.files == undefined) {return;}
      let amlPdf = request.req.files.aml_pdf;

      if (amlPdf != undefined) {
        let name = amlPdf.name;
        let full_path = name + "_" + Date.now();
        let type = amlPdf.mimetype;

        try {
          // Use the mv() method to place the file somewhere on your server
          amlPdf.mv('data/data/media/certificates/' + full_path, function (err) {
            if (err)
            return Exception.reject(err, 500);
          });
        } catch (err) {
          console.log(err);
        }

        this.getModel('Media').create({
          name,
          type,
          full_path }).
        then((media) => {
          if (request.body.id != undefined) {
            this.getModel().findById(request.body.id, function (err, doc) {
              doc.aml_pdf = media;
              doc.save();
            });
          } else {
            //on create
            this.getModel().findOne().sort('-created_at').exec(function (err, doc) {
              doc.aml_pdf = media;
              doc.save();
            });
          }
        });
      }

      let pdf = request.req.files.pdf;

      if (pdf == undefined) {
        return;
      }

      let name = pdf.name;
      let type = pdf.mimetype;
      let full_path = name + "_" + Date.now();

      try {
        // Use the mv() method to place the file somewhere on your server
        pdf.mv('data/data/media/certificates/' + full_path, function (err) {
          if (err)
          return Exception.reject(err, 500);
        });
      } catch (err) {
        console.log(err);
      }

      this.getModel('Media').create({
        name,
        type,
        full_path }).
      then((media) => {

        if (request.body.id != undefined) {
          this.getModel().findById(request.body.id, function (err, doc) {
            doc.pdf = media;
            doc.save();
          });
        } else {
          //on create
          this.getModel().findOne().sort('-created_at').exec(function (err, doc) {
            doc.pdf = media;
            doc.save();
          });
        }
      });

    });

  }

  /**
   * Update single
   */
  update(request) {
    const id = request.params.certificate_id;

    return this.validate('update', request).then(({ name, ctype, cid, aml_name, products, aircraft_makes, aircraft_models, approved_aircraft_models }) => {
      const safe = (0, _utils.permalink)(name);

      this.linkProductsWithAml(products, aircraft_makes, aircraft_models);

      return this.getModel().countDocuments({
        _id: {
          $ne: id },

        safe }).
      then((count) => {
        return this.getModel().findByIdAndUpdate(id, {
          name,
          ctype,
          cid,
          aml_name,
          products,
          aircraft_makes,
          aircraft_models,
          approved_aircraft_models,
          permalink: safe + (count > 0 ? '-' + (count + 1) : ''),
          safe });

      });
    });
  }

  /**
   * Paginate
   */
  paginate({ query }, options = {}, projections = null) {
    const Model = this.getModel(),
    skip = Math.max(parseInt(query.start || '0'), 0),
    limit = Math.max(parseInt(query.limit || '20'), 1),
    others = { limit, skip };
    if (query.sort && ['asc', 'desc'].indexOf((query.order || '').toLowerCase()) >= 0) {
      others.sort = {
        [query.sort]: query.order };

    }
    return Promise.resolve(((filters = {}) => {
      if (isFunction(filters)) {
        filters = filters({});
      }
      return filters;
    })(options.filters)).then((filters) => {
      /**
       * Multiple _id filter
       */
      if (!isUndefined(query.id)) {
        filters._id = {
          $in: (query.id + '').split(',').filter((_id) => {
            return Types.ObjectId.isValid(_id);
          }) };

      }
      return Model.countDocuments(filters).then((count) => {
        const find = Model.find(filters, projections, others).lean();
        if (options.populate) {
          find.populate(options.populate);
        }
        return find.then((results) => {
          let mapped = this.mapCertificates(results);
          return {
            count,
            results: mapped };

        });
      });
    });
  }

  mapCertificates(results) {
    return results.map((x) => {
      let mp = x;
      mp.approved_aircrafts = [];

      if (x.aircraft_makes && x.aircraft_models)
      x.aircraft_makes.forEach((element) => {
        x.aircraft_models.filter((am) => {
          return am.aircraft_make + "" == element._id + "";
        }).forEach((el) => {
          mp.approved_aircrafts.push({
            value: element._id,
            label: element.name + ' ' + el.name });

        });
      });
      return mp;
    });
  }

  /**
   *
   * @param products
   * @param aircraft_makes
   * @param aircraft_models
   */
  linkProductsWithAml(products, aircraft_makes, aircraft_models) {
    if (products.length == 0) return;
    let query = this.getModel('Product').find({ '_id': { $in: products } }, (err, products) => {
      products.forEach((pr) => {
        if (aircraft_makes) {
          aircraft_makes.forEach((am) => {
            pr.approved_aircraft_makes.push(am);
          });
        }
        if (aircraft_models) {
          aircraft_models.forEach((am) => {
            pr.approved_aircraft_models.push(am);
          });
        }

        pr.save();
      });
    });

  }}exports.default = Certificate;