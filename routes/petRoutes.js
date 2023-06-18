import express from "express";
import multer from 'multer';
const router = express.Router();
import { requireSignIn  , isAdmin} from "../middlewares/authMiddleware.js";
import { 
    postController, 
    deletePetController, 
    getallController,
    getIdController,
    likeController,
    searchPetController,
} from "../controllers/petController.js";


const storage = multer.diskStorage({
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
const upload = multer({ storage: storage });

// Get specific pet
router.get('/:id', getIdController);

// Upload Pet
router.post('/post-pet' , upload.single('file') , requireSignIn , isAdmin , postController);

// delete Pet
router.delete('/delete-pet/:id' , requireSignIn , isAdmin ,deletePetController);

// Get All Posts
router.get('/all-pets/:page' ,getallController);

// Likes Update :id = _id of pet and :uid = _id of user
router.patch('/like/:id/:uid' , requireSignIn, likeController);

// Search Pet here :keyword = keyword for search in search bar
router.get('/search/:keyword' , requireSignIn , searchPetController);
export default router;