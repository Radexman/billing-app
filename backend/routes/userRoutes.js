import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', (req, res) => registerUser(req, res));

router.post('/login', (req, res) => loginUser(req, res));

export default router;
