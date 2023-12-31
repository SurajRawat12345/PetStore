import express from "express";
const router = express.Router();
import { requireSignIn  , isAdmin} from "../middlewares/authMiddleware.js";
import { 
    deletePetController, 
    getallController,
    getIdController,
    likeController,
    searchPetController,
} from "../controllers/petController.js";

// Get specific pet
router.get('/:id', getIdController);

// delete Pet
router.delete('/delete-pet/:id', requireSignIn ,isAdmin , deletePetController);

// Get All Posts
router.get('/all-pets/:page' , getallController);

// Likes Update :id = _id of pet and :uid = _id of user
router.patch('/like/:id/:uid' , likeController);

// Search Pet here :keyword = keyword for search in search bar
router.get('/search/:keyword' , searchPetController);

export default router;