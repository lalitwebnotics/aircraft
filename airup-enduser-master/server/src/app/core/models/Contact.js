import { Schema } from 'mongoose';

/**
 * Contact
 */
const Contact = new Schema({
  type: {
    enum: [
      'email',
      'mobile',
      'telephone',
      'website'
    ],
    type: String
  },
  value: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default Contact;
