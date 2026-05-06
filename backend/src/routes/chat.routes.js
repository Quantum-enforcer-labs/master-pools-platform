import { Router } from 'express';
import {
  getConversations, getOrCreateConversation,
  getMessages, sendMessage, closeConversation
} from '../controllers/chat.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();
router.use(protect);
router.get('/conversations', getConversations);
router.post('/conversations', getOrCreateConversation);
router.get('/conversations/:conversationId/messages', getMessages);
router.post('/conversations/:conversationId/messages', sendMessage);
router.patch('/conversations/:conversationId/close', closeConversation);

export default router;
