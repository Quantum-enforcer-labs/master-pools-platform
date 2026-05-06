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
