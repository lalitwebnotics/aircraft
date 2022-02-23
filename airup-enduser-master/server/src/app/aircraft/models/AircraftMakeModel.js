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
const AircraftMakeModel = new Schema({
  name: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default Aircraft;
