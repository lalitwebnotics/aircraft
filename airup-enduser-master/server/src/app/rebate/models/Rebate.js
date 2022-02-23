import { Schema } from 'mongoose';

/**
 * Rebate
 */
const Rebate = new Schema({
  amount: Number,
  manufacturer: {
    ref: 'Manufacturer',
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

export default Rebate;
