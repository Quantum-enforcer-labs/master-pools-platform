import { Router } from 'express';
import {
  getProjects, getProject, getStats,
  adminGetProjects, createProject, updateProject, deleteProject, togglePublish
} from '../controllers/project.controller.js';
import { protect, adminOnly, optionalAuth } from '../middleware/auth.middleware.js';

const router = Router();

// Public
router.get('/', getProjects);
router.get('/stats', getStats);
router.get('/:id', optionalAuth, getProject);

// Admin
router.get('/admin/all', protect, adminOnly, adminGetProjects);
router.post('/', protect, adminOnly, createProject);
router.put('/:id', protect, adminOnly, updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);
router.patch('/:id/publish', protect, adminOnly, togglePublish);

export default router;
