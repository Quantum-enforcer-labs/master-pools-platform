import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: String,
  fileId: String,
  thumbnail: String,
  alt: String
}, { _id: false });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String, maxlength: 200 },
  category: {
    type: String,
    enum: ['residential', 'commercial', 'olympic', 'infinity', 'indoor', 'natural', 'custom'],
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'ongoing', 'upcoming'],
    default: 'completed'
  },
  coverImage: imageSchema,
  gallery: [imageSchema],
  location: { type: String },
  client: { type: String },
  duration: { type: String },
  area: { type: String },
  depth: { type: String },
  features: [String],
  tags: [String],
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
  completedAt: { type: Date },
  startedAt: { type: Date },
  views: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Auto-generate slug
projectSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();
  }
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export default mongoose.model('Project', projectSchema);
