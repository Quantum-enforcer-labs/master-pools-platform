import express from "express";
import {
  deleteVideo,
  getVideos,
  reorderVideos,
  updateVideo,
  uploadVideo,
  videoUpload,
} from "../controllers/video.controller.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getVideos);

// Admin routes (protected)
router.post(
  "/upload",
  authenticateToken,
  authorizeAdmin,
  videoUpload.single("video"),
  uploadVideo,
);

router.put("/:id", authenticateToken, authorizeAdmin, updateVideo);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteVideo);
router.post("/reorder", authenticateToken, authorizeAdmin, reorderVideos);

export default router;
