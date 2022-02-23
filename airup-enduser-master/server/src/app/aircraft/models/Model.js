import { Schema } from 'mongoose';

/**
 * Aircraft Model
 */
const AircraftModel = new Schema({
  aircraft_make: {
    ref: 'AircraftMake',
    type: Schema.Types.ObjectId
  },
  model: String,
  certificate: {
    ref: 'Certificate',
    type: Schema.Types.ObjectId
  },
  certificates: [{
    ref: 'Certificate',
    type: Schema.Types.ObjectId
  }],
  engine_model: {
    ref: 'EngineModel',
    type: Schema.Types.ObjectId
  },
  name: String,
  permalink: String,
  safe: String,
  turbo: Boolean,
  years: [Number]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default AircraftModel;
