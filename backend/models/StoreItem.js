const mongoose = require('mongoose');

const storeItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  points: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['medical', 'hygiene', 'protective', 'supplement', 'equipment'],
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: -1 // -1 means unlimited stock
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StoreItem', storeItemSchema);
