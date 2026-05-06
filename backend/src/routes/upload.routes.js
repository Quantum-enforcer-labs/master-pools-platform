import { Router } from 'express';
import { uploadImage, uploadMultiple, deleteImage, getAuthParams, upload } from '../controllers/upload.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = Router();
router.use(protect);
router.get('/auth', getAuthParams);
router.post('/single', upload.single('image'), uploadImage);
router.post('/multiple', adminOnly, upload.array('images', 20), uploadMultiple);
router.delete('/', adminOnly, deleteImage);

export default router;
