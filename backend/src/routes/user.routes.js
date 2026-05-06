import { Router } from 'express';
import { adminGetUsers, adminToggleUser } from '../controllers/user.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = Router();
router.use(protect, adminOnly);
router.get('/', adminGetUsers);
router.patch('/:id/toggle', adminToggleUser);

export default router;
