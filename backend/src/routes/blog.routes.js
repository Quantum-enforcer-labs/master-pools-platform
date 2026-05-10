import {
  adminGetPosts,
  createPost,
  deletePost,
  getPost,
  getPosts,
  togglePublish,
  updatePost,
} from "../controllers/blog.controller.js";
import {
  adminOnly,
  optionalAuth,
  protect,
} from "../middleware/auth.middleware.js";

import { Router } from "express";

const router = Router();

router.get("/", getPosts);
router.get("/:slug", optionalAuth, getPost);

router.get("/admin/all", protect, adminOnly, adminGetPosts);
router.post("/", protect, adminOnly, createPost);
router.put("/:id", protect, adminOnly, updatePost);
router.delete("/:id", protect, adminOnly, deletePost);
router.patch("/:id/publish", protect, adminOnly, togglePublish);

export default router;
