import { Schema } from 'mongoose';

/**
 * Certificate
 */
const Certificate = new Schema({
  name: String,
  ctype: String, //certifate type
  cid: String,//certificate id
  aml_name: String,
  products: [{
    ref: 'Product',
    type: Schema.Types.ObjectId
  }],
  aircraft_makes: [{
    ref: 'AircraftMake',
    type: Schema.Types.ObjectId
  }],
  aircraft_models: [{
    ref: 'AircraftModel',
    type: Schema.Types.ObjectId
  }],
  approved_aircraft_makes: [{
    ref: 'AircraftMake',
    type: Schema.Types.ObjectId
  }],
  approved_aircraft_models: [{
    ref: 'AircraftModel',
    type: Schema.Types.ObjectId
  }],
  pdf: {
    ref: 'Media',
    type: Schema.Types.ObjectId
  },
  aml_pdf: {
    ref: 'Media',
    type: Schema.Types.ObjectId
  },
  permalink: String,
  reference: String,
  safe: String,
  type: {
    enum: [
      'aircraft',
      'engine',
      'supplemental'
    ],
    type: String
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default Certificate;
