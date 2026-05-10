import BlogPost from "../models/BlogPost.model.js";
import User from "../models/User.model.js";

export const seedAdmin = async () => {
  try {
    const exists = await User.findOne({ role: "admin" });
    if (exists) return;

    await User.create({
      name: "MATERPOOLS AND CONTRUCTION Admin",
      email: process.env.ADMIN_EMAIL || "admin@masterpools.com",
      password: process.env.ADMIN_PASSWORD || "Admin@123456",
      role: "admin",
      isVerified: true,
    });
    console.log("Admin user seeded");
  } catch (err) {
    console.error("Seed error:", err.message);
  }
};

export const seedBlogPost = async () => {
  try {
    const admin = await User.findOne({ role: "admin" });
    if (!admin) return;

    const existingPost = await BlogPost.findOne({});
    if (existingPost) return;

    await BlogPost.create({
      title: "Welcome to the MasterPools updates hub",
      slug: "welcome-to-the-masterpools-updates-hub",
      excerpt:
        "We are using this space to share project updates, service notes, and company announcements from the team.",
      content:
        "This is the first update on the new Latest page. We will use it to post practical project notes, completed work, service improvements, and important company news.\n\nExpect short, useful updates from the team here. If you are a returning client, this is where you can check what we have been building recently.",
      category: "announcement",
      featured: true,
      isPublished: true,
      publishedAt: new Date(),
      tags: ["announcement", "company news", "updates"],
      createdBy: admin._id,
    });

    console.log("Starter blog post seeded");
  } catch (err) {
    console.error("Blog seed error:", err.message);
  }
};
