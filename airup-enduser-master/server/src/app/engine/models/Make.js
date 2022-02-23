import { Schema } from 'mongoose';

/**
 * Engine Make
 */
const EngineMake = new Schema({
  name: String,
  permalink: String,
  safe: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default EngineMake;
