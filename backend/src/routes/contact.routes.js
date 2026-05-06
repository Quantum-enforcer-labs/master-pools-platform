// contact.routes.js
import { Router as R1 } from 'express';
import { submitContact, adminGetContacts, adminUpdateContact } from '../controllers/contact.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
const contactRouter = R1();
contactRouter.post('/', submitContact);
contactRouter.get('/admin', protect, adminOnly, adminGetContacts);
contactRouter.patch('/admin/:id', protect, adminOnly, adminUpdateContact);
export { contactRouter as default };
