import { Schema } from 'mongoose';

/**
 * Address
 */
const Address = new Schema({
  line_1: String,
  line_2: String,
  city: String,
  country: String,
  state: String,
  zip_code: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default Address;
