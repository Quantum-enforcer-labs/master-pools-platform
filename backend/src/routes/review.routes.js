import { Router } from 'express';
import { createReview, getPublicReviews, adminGetReviews, adminToggleReview } from '../controllers/review.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/', getPublicReviews);
router.post('/', protect, createReview);
router.get('/admin', protect, adminOnly, adminGetReviews);
router.patch('/admin/:id/toggle', protect, adminOnly, adminToggleReview);

export default router;
