import dotenv from "dotenv";
dotenv.config();
import imageModel from "../models/imagesModel.js";

// Configuring Cloudinary
import * as Cloudinary from 'cloudinary';

Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// To Add Image
export const addImage = async(req,res) => {
    try{
        const {description} = req.body;
        const result = await Cloudinary.uploader.upload(req.file.path);
        if(!description){
            return res.status(409).send({message : "Images's Description is required"});
        }
        const new_image = await new imageModel({
            description,
            image_url : result.secure_url,
        }).save()
        res.status(200).send({
            success : true,
            message : "Image Added successfully",
            new_image,
        })
    }
    catch(error){
        res.status(500).send({
            success : false,
            message : "Error while uploading image",
            error,
        })
    }
}

// To display images
export const displayImage = async(req,res) => {
    try{
        const perPage = 10;
        const page = req.params.page ? (req.params.page) : (1);
        const Images = await imageModel.find({})
        .limit(perPage*page)
        .sort({createdAt: -1});
        res.status(200).send({
            success: true,
            msg: "Fetched all Images",
            Images,
        })
    }
    catch(error){
        //console.log(error);
        res.status(500).send({
            success: false,
            msg: "Error while loading Images Data",
            error,
        })   
    }
} 