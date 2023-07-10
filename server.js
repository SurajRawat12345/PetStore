import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authroutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import petRoutes from './routes/petRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import cloudinary from 'cloudinary';

// Configuring .env file variables
dotenv.config();

// Connecting Database
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI , {
    useNewUrlParser : true , 
    useUnifiedTopology : true
})
.then(console.log("Connected DB"))

// Configuring express App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
});


// Routes
app.use('/api/v1/auth' , authRoutes);
app.use('/api/v1/category' , categoryRoutes);
app.use('/api/v1/pet' , petRoutes);
app.use('/api/v1/images' , imageRoutes);

app.get('/' , async(req,res) => {
    res.status(200).json("Hello User glad to see u");
})

// Server Listening on port
const port = process.env.PORT || 8080;
app.listen(port , () => {
    console.log(`server is running on port ${port}`);
})