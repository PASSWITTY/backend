import express from 'express';
const router = express.Router();

import { registerUser, loginUser, getCurrentUser } from '../controllers/userController.js';
import auth from '../middleware/auth.js'; // Assuming auth is a default export

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', auth, getCurrentUser);

export default router;
