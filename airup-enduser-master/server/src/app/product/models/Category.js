import { Schema } from 'mongoose';

/**
 * Category
 */
const Category = new Schema({
  name: String,
  rebate: {
    ref: 'Rebate',
    type: Schema.Types.ObjectId
  },
  permalink: String,
  safe: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default Category;
