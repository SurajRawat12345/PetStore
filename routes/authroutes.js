import express from 'express';
const router = express.Router();
import { loginController, registerController } from '../controllers/userController.js';

// Register Route
router.post('/register' , registerController);

// Login Route
router.post('/login' , loginController);

export default router;