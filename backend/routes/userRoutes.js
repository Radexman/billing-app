import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', (req, res) => registerUser(req, res));
router.post('/login', (req, res) => loginUser(req, res));
router.get('/me', protect, getMe);

export default router;
