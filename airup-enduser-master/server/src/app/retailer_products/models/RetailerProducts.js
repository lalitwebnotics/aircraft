import { Schema } from 'mongoose';

/**
 * RetailerProducts
 */
const RetailerProducts = new Schema({
  retailer: {
    ref: 'Retailer',
    type: Schema.Types.ObjectId
  },
  price: Number,
  product_url: String,
  product: {
    ref: 'Product',
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

export default RetailerProducts;
