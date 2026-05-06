import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let memoryServer;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  try {
    if (!uri) {
      throw new Error("MONGODB_URI is not set");
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(
      `⚠️  MongoDB connection failed (${error.message}). Starting in-memory fallback...`,
    );

    try {
      memoryServer = await MongoMemoryServer.create({
        instance: { dbName: "masterpools" },
      });

      const fallbackUri = memoryServer.getUri();
      const conn = await mongoose.connect(fallbackUri);
      console.log(`In-memory MongoDB ready: ${conn.connection.host}`);
      return true;
    } catch (fallbackError) {
      console.error(
        "❌ In-memory MongoDB fallback failed:",
        fallbackError.message,
      );
      return false;
    }
  }
};
