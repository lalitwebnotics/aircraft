import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

/**
 * User
 */
const User = new Schema({
  addresses: [{
    ref: 'Address',
    type: Schema.Types.ObjectId
  }],
  contacts: [{
    ref: 'Contact',
    type: Schema.Types.ObjectId
  }],
  email: String,
  name: String,
  phone: String,
  password: String,
  imageUrl: String,
  role: {
    default: 'user',
    enum: [
      'user',
      'admin',
      'super'
    ],
    type: String
  },
  status: {
    default: 'active',
    enum: [
      'active',
      'inactive',
      'suspended'
    ],
    type: String
  },
  subscription: {
    default: 'weekly',
    enum: [
      'none',
      'daily',
      'weekly',
      'monthly'
    ],
    type: String
  },
  token: String,
  username: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default User;

/**
 * Before save
 */
User.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      next(err);
    } else {
      this.password = hash;
      next();
    }
  });
});

/**
 * Check password
 */
User.methods.check = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if (err || !valid) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
};

/**
 * Generate token
 */
User.methods.generateToken = function() {
  this.token = crypto
    .createHash('sha256')
    .update((new Date()).toString())
    .digest('hex');
  return this.save();
};

/**
 * Find account
 */
User.statics.findAccount = function(account, projections, options) {
  return this.findOne({
    $or: [{
      email: account
    }, {
      username: account
    }]
  }, projections, options);
};
