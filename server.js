require("dotenv").config();
const express= require('express');
const cors = require("cors");
const multer = require('multer');
const mongoose = require('mongoose');
const morgan = require("morgan");
const petModel = require("./models/petModel.js");
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.set('strictQuery', false); 
mongoose.connect(process.env.MONGO_URI , {useNewUrlParser : true , useUnifiedTopology : true})
.then(console.log("Connected DB"))

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/' , (req,res) => {
    res.status(200).send({msg : "Hello Admin"});
})

app.post('/api/v1/pet/post-pet', upload.single('file'), async(req, res)=>{
    try {
        const{name ,species ,price ,description ,category} = req.body;
        if(!name || !species || !price || !description || !category ){
            res.status(409).send({ msg : "Enter all fields"})
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        const new_pet = await petModel({
            name,
            species,
            price,
            category,
            description,
            image: {
                public_id : result.public_id, 
                url : result.secure_url,
            },
        }).save()
        res.status(200).send({ 
            success : true,
            msg : "Pet Created Successfully",
            new_pet,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ 
            success : false,
            msg : "Pet Not Added Successfully",
            err,
        });
    }
});
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})