import dotenv from "dotenv";
dotenv.config();
import petModel from "../models/petModel.js";

// To delete pet
export const deletePetController = async(req,res) => {
    try{
        const {id} = req.params;
        const deletePet = await petModel.findByIdAndDelete({_id:id});
        res.status(200).send({
            success: true,
            msg: "Pet Deleted Successfully",
            deletePet, 
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            msg: "Error in delting post",
            error,
        })
    }
}  

// To get all latest pets
export const getallController = async(req,res) => {
    try{
        const perPage = 8;
        const page = req.params.page ? (req.params.page) : (1);
        const Pets = await petModel.find({})
        .limit(perPage*page)
        .sort({createdAt: -1});
        res.status(200).send({
            success: true,
            msg: "Fetched all Pets",
            Pets,
        })
    }
    catch(error){
        //console.log(error);
        res.status(500).send({
            success: false,
            msg: "Error while loading Data",
            error,
        })   
    }
} 

// To get Specific pet details
export const getIdController = async(req,res) => {
    try{
        const {id} = req.params;
        const pet = await petModel.find({_id : id});
        res.status(200).send({
            success: true,
            msg: "Fetched single pet",
            pet,
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            msg: "Error in getting specific Pet",
            error, 
        })
    }
}

// LIKE and UNLIKE Controller
export const likeController = async(req,res) => {
    try{
        const {id} = req.params;
        const {uid} = req.params;
        const user = await petModel.findOne({_id : id});
        let num = 0;
        let array1 = await [...user.likes];
        for(let i in array1){
            if(array1[i] == uid){
                if (i > -1) { 
                    num = 1; 
                }
                break;
            }
        }
        if(num == 1){
            const unliked_pet = await petModel.findOneAndUpdate({_id : id } , 
                { $pull : { likes : uid }} , {new : true});
            res.status(200).send({
                success: true,
                msg: "Unliked Pet",
                unliked_pet,
                user,
            })
        }
        else{
            const liked_pet = await petModel.findOneAndUpdate({_id : id } , 
                {$push: { likes : uid }} , {new:true});
            res.status(200).send({
                success: true,
                msg: "Liked Pet",
                liked_pet,
                user,
            })
        }
    }
    catch(error){
        //console.log(error);
        res.status(500).send({
            success: false,
            msg: "Error in updating pet like",
            error, 
        })
    }
}

// Search Controller
export const searchPetController = async(req,res) => {
    try{
        const {keyword} = req.params;
        const results = await petModel.find({
            $or:[
                {name: { $regex : keyword , $options : 'i'}},
                {species : { $regex : keyword , $options : 'i' }},
                {category : { $regex : keyword , $options : 'i'}} 
            ],
        })
        res.status(200).send({
            success: true,
            msg : "Searched pet",
            results,
        })
    }
    catch(error){
        res.status(500).send({
            success : false,
            msg: "Error in Searching",
            error,
        })
    }
}