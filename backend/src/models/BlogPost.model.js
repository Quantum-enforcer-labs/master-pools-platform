import mongoose from "mongoose";

const blogImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    fileId: { type: String },
    thumbnail: { type: String },
    alt: { type: String },
  },
  { _id: false },
);

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, trim: true, default: "" },
    content: { type: String, required: true, trim: true },
    coverImage: { type: blogImageSchema },
    tags: [{ type: String, trim: true }],
    category: {
      type: String,
      enum: ["update", "blog", "announcement", "project"],
      default: "update",
    },
    featured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("BlogPost", blogPostSchema);
