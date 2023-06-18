import express from 'express';
import multer from 'multer';
const router = express.Router();
import { addImage , displayImage } from '../controllers/imageController.js';
import { requireSignIn  , isAdmin} from "../middlewares/authMiddleware.js";

const storage = multer.diskStorage({
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
const upload = multer({ storage: storage });

// For posting images
router.post("/upload-image", upload.single("file"),requireSignIn , isAdmin , addImage);

// Show Image route
router.get('/get-images/:page' , displayImage);

export default router;