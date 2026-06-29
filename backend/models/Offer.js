const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  badge: {
    type: String,
    required: [true, 'Please add an offer badge'],
    trim: true,
  },
  discount: {
    type: String,
    required: [true, 'Please add a discount value'],
    trim: true,
  },
  title: {
    en: {
      type: String,
      required: [true, 'Please add an English title'],
      trim: true,
    },
    ar: {
      type: String,
      required: [true, 'Please add an Arabic title'],
      trim: true,
    }
  },
  description: {
    en: {
      type: String,
      required: [true, 'Please add an English description'],
      trim: true,
    },
    ar: {
      type: String,
      required: [true, 'Please add an Arabic description'],
      trim: true,
    }
  },
  code: {
    type: String,
    required: [true, 'Please add a promo code'],
    unique: true,
    uppercase: true,
    trim: true,
  },
  expires: {
    en: {
      type: String,
      required: [true, 'Please add an English expiration message'],
      trim: true,
    },
    ar: {
      type: String,
      required: [true, 'Please add an Arabic expiration message'],
      trim: true,
    }
  },
  color: {
    type: String,
    default: 'from-cyber-pink/20 to-transparent',
  },
  border: {
    type: String,
    default: 'border-cyber-pink/30',
  },
  glow: {
    type: String,
    default: 'shadow-neon-pink',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Offer', OfferSchema);
