import { Schema } from 'mongoose';

/**
 * Product
 */
const Product = new Schema({
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
  categories: [{
    ref: 'Category',
    type: Schema.Types.ObjectId
  }],
  // retailers: [{
  //   ref: 'Retailer',
  //   type: Schema.Types.ObjectId
  // }],
  rebate: {
    ref: 'Rebate',
    type: Schema.Types.ObjectId
  },
  old_product: String,
  certificates: [{
    ref: 'Certificate',
    type: Schema.Types.ObjectId
  }],
  description: String,
  manufacturer: {
    ref: 'Manufacturer',
    type: Schema.Types.ObjectId
  },
  media: [{
    ref: 'Media',
    type: Schema.Types.ObjectId
  }],
  name: String,
  part: String,
  permalink: String,
  pma: {
    enum: [
      'maybe',
      'no',
      'yes'
    ],
    type: String
  },
  price: Number,
  old_price: Number,
  safe: String,
  tso: {
    enum: [
      'maybe',
      'no',
      'yes'
    ],
    type: String
  },
  url: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default Product;
