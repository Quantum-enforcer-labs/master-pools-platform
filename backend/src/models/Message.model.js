import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quotation: { type: mongoose.Schema.Types.ObjectId, ref: 'Quotation' },
  subject: { type: String, default: 'General Inquiry' },
  status: { type: String, enum: ['open', 'closed', 'archived'], default: 'open' },
  lastMessage: { type: String },
  lastMessageAt: { type: Date },
  unreadByUser: { type: Number, default: 0 },
  unreadByAdmin: { type: Number, default: 0 },
  isTypingUser: { type: Boolean, default: false },
  isTypingAdmin: { type: Boolean, default: false }
}, { timestamps: true });

export const Conversation = mongoose.model('Conversation', conversationSchema);

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderRole: { type: String, enum: ['user', 'admin'] },
  content: { type: String, required: true },
  type: {
    type: String,
    enum: ['text', 'image', 'quotation', 'system'],
    default: 'text'
  },
  attachments: [{ url: String, fileId: String, name: String }],
  isRead: { type: Boolean, default: false },
  readAt: Date
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);
