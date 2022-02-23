import { Schema } from 'mongoose';

/**
 * Manufacturer
 */
const Manufacturer = new Schema({
  address: {
    ref: 'Address',
    type: Schema.Types.ObjectId
  },
  contacts: [{
    ref: 'Contact',
    type: Schema.Types.ObjectId
  }],
  name: String,
  nickname: String,
  permalink: String,
  safe: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default Manufacturer;
