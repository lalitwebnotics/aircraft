import { Schema } from 'mongoose';

/**
 * Category updates
 */
export const updates = {
  categories: {
    none: 0,
    active: 1,
    price: 2,
    rebate: 4
  },
  frequencies: {
    none: 0,
    daily: 1,
    weekly: 2,
    monthly: 3
  },
  products: {
    none: 0,
    approved: 1,
    nonapproved: 2
  }
};

/**
 * Aircraft
 */
const Aircraft = new Schema({
  aircraft_model: {
    ref: 'AircraftModel',
    type: Schema.Types.ObjectId
  },
  categories: [{
    category: {
      ref: 'Category',
      type: Schema.Types.ObjectId
    },
    updates: Number
  }],
  frequency: Number,
  products: Number,
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  year: Number,
  last_notified: Date,
  newProductDate: Date,
  updateProductDate: Date,
  tailNumber: String,
  imageUrl: {
    type: String,
    get: function (imageUrl) {
      if (imageUrl && imageUrl.indexOf('https://') == -1) {
        return `https://d2kijztdgb1j07.cloudfront.net/${imageUrl}`;
      }
      return imageUrl || '';
    }
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  toObject: { getters: true },
  toJSON: { getters: true },
});

export default Aircraft;
