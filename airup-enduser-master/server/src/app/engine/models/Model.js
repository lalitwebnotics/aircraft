import { Schema } from 'mongoose';

/**
 * Engine Model
 */
const EngineModel = new Schema({
  certificate: String,
  cylinders: Number,
  engine_make: {
    ref: 'EngineMake',
    type: Schema.Types.ObjectId
  },
  name: String,
  permalink: String,
  safe: String,
  type: {
    enum: [
      'carbureted',
      'injected'
    ],
    type: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default EngineModel;
