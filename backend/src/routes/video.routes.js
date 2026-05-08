import {
  deleteVideo,
  getVideos,
  reorderVideos,
  updateVideo,
  uploadVideo,
  videoUpload,
} from "../controllers/video.controller.js";
import { adminOnly, protect } from "../middleware/auth.middleware.js";

import express from "express";

const router = express.Router();

// Public routes
router.get("/", getVideos);

// Admin routes (protected)
router.post(
  "/upload",
  protect,
  adminOnly,
  videoUpload.single("video"),
  uploadVideo,
);

router.put("/:id", protect, adminOnly, updateVideo);
router.delete("/:id", protect, adminOnly, deleteVideo);
router.post("/reorder", protect, adminOnly, reorderVideos);

export default router;
