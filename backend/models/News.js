const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['health', 'medicine', 'environment', 'policy', 'technology', 'general'],
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
newsSchema.index({ category: 1, publishedAt: -1 });
newsSchema.index({ isPublished: 1, publishedAt: -1 });
newsSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('News', newsSchema);
