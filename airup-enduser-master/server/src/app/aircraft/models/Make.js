import { Schema } from 'mongoose';

/**
 * Aircraft Make
 */
const AircraftMake = new Schema({
  name: String,
  permalink: String,
  safe: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default AircraftMake;
