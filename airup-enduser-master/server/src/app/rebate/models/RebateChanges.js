import { Schema } from 'mongoose';

/**
 * Rebate
 */
const RebateChanges = new Schema({
  name: String,
  amount: Number,
  rebate: {
    ref: 'Rebate',
    type: Schema.Types.ObjectId
  },
  manufacturer: {
    ref: 'Manufacturer',
    type: Schema.Types.ObjectId
  },
  pdf: {
    ref: 'Media',
    type: Schema.Types.ObjectId
  },
  url: String,
  expiry_date: Date,
  permalink: String,
  safe: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default RebateChanges;
