import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  content: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

export const Review = mongoose.model('Review', reviewSchema);

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  source: { type: String, default: 'contact-form' }
}, { timestamps: true });

export const Contact = mongoose.model('Contact', contactSchema);
