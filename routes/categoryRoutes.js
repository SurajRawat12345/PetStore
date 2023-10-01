import express from 'express';
const router = express.Router();
import { requireSignIn , isAdmin} from '../middlewares/authMiddleware.js';
import { 
    addCategoryController , getCategoryController , deleteCategoryController , updateCategoryController 
    } from '../controllers/categoryController.js';

// Adding Category Route
router.post('/add', requireSignIn, isAdmin, addCategoryController);

// Deleting Category Route
router.delete('/delete/:id', requireSignIn, isAdmin, deleteCategoryController);

// Getting all categories route
router.get('/get-all' , getCategoryController);

// Updating a category
router.put('/update/:id',requireSignIn, isAdmin , updateCategoryController);

export default router;