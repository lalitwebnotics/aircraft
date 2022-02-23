import { Schema } from 'mongoose';

/**
 * Session
 */
const ContactAdvertisement = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  companyName: {
    type: String
  },
  phoneNumber: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default ContactAdvertisement;

