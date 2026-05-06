import mongoose from 'mongoose';

const quotationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  referenceNumber: { type: String, unique: true },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'quoted', 'accepted', 'rejected', 'expired'],
    default: 'pending'
  },
  // Pool details from user
  poolType: {
    type: String,
    enum: ['residential', 'commercial', 'olympic', 'infinity', 'indoor', 'natural', 'custom'],
    required: true
  },
  poolShape: {
    type: String,
    enum: ['rectangular', 'oval', 'kidney', 'freeform', 'circular', 'lap', 'custom'],
    required: true
  },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    depth: { type: Number },
    unit: { type: String, default: 'meters' }
  },
  features: [String],
  location: {
    address: String,
    city: String,
    country: String
  },
  budget: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'USD' }
  },
  timeline: String,
  additionalNotes: String,
  attachments: [{ url: String, fileId: String, name: String }],

  // Admin response
  quotedAmount: {
    amount: Number,
    currency: { type: String, default: 'USD' },
    breakdown: [{
      item: String,
      cost: Number,
      description: String
    }]
  },
  validUntil: Date,
  adminNotes: String,
  quotedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quotedAt: Date,

  // Conversation linked to this quotation
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }
}, { timestamps: true });

// Auto-generate reference number
quotationSchema.pre('save', function (next) {
  if (!this.referenceNumber) {
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    this.referenceNumber = `MP-${year}-${random}`;
  }
  next();
});

export default mongoose.model('Quotation', quotationSchema);
