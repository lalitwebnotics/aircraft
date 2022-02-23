import { Schema } from 'mongoose';

/**
 * Retailer
 */
const Retailer = new Schema({
  name: String,
  logo: {
    ref: 'Media',
    type: Schema.Types.ObjectId
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default Retailer;
