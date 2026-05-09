import { Router } from "express";
import {
  sendNewsletter,
  subscribe,
  unsubscribe,
} from "../controllers/newsletter.controller.js";
import { adminOnly, protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", subscribe);
router.post("/unsubscribe", unsubscribe);

// Admin endpoint to send newsletter
router.post("/admin/send", protect, adminOnly, sendNewsletter);

export default router;
