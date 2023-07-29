import express from 'express';
const router = express.Router();
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { 
    addCategoryController , getCategoryController , deleteCategoryController , updateCategoryController 
    } from '../controllers/categoryController.js';

// Adding Category Route
router.post('/add' , requireSignIn , addCategoryController);

// Deleting Category Route
router.delete('/delete/:id' , deleteCategoryController);

// Getting all categories route
router.get('/get-all' , getCategoryController);

// Updating a category
router.put('/update/:id' , updateCategoryController);

export default router;