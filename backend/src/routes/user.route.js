import express from 'express';
import { registerUser , loginUser, getMyOrganization } from '../controllers/user.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me/organization', auth, getMyOrganization);

export default router;
