// quotation.routes.js
import { Router } from 'express';
import {
  createQuotation, getUserQuotations, getQuotation,
  adminGetQuotations, adminUpdateQuotation, adminGetStats
} from '../controllers/quotation.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = Router();
router.post('/', protect, createQuotation);
router.get('/my', protect, getUserQuotations);
router.get('/:id', protect, getQuotation);
router.get('/admin/all', protect, adminOnly, adminGetQuotations);
router.get('/admin/stats', protect, adminOnly, adminGetStats);
router.put('/admin/:id', protect, adminOnly, adminUpdateQuotation);

export default router;
