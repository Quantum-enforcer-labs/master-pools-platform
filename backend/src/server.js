import "dotenv/config";

import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { initSocket } from "./config/socket.js";
import { seedAdmin, seedBlogPost } from "./utils/seed.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
initSocket(server);

connectDB().then(async (connected) => {
  if (connected) {
    await seedAdmin();
    await seedBlogPost();
  }

  server.listen(PORT, () => {
    console.log(`MATERPOOLS AND CONTRUCTION Server running on port ${PORT}`);
    if (!connected) {
      console.warn(
        "⚠️  Server is running without a MongoDB connection. Database-backed features will not work until MongoDB is available.",
      );
    }
  });
});
