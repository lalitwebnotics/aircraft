import { Schema } from 'mongoose';

/**
 * Track updates
 */
export const updates = {
  none: 0,
  price: 1,
  rebate: 2
};

/**
 * Track
 */
const Track = new Schema({
  product: {
    ref: 'Product',
    type: Schema.Types.ObjectId
  },
  last_notified: Date,
  updates: {
    default: updates.none,
    type: Number
  },
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default Track;
