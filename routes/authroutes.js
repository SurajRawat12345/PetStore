import express from 'express';
const router = express.Router();
import { loginController, logoutController, registerController } from '../controllers/userController.js';

// Register Route
router.post('/register' , registerController);

// Login Route
router.post('/login' , loginController);

// Logout Route
router.get('/logout' ,  logoutController);

export default router;