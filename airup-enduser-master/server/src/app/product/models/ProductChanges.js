import { Schema } from 'mongoose';

/**
 * ProductChanges
 */
const ProductChanges = new Schema({
  newValues: Object,
  oldValues: Object,
  rebateChanges: Boolean,
  productChanges: Boolean,
  productId: {
    ref: 'Product',
    type: Schema.Types.ObjectId
  },
  changedBy: {
    ref: 'User',
    type: Schema.Types.ObjectId
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default ProductChanges;
