import categoryModel from '../models/categoryModel.js';

// Add Category Controller Function for ADMIN only
export const addCategoryController = async(req,res) => {
    try{
        const { name , icon } = req.body;
        if(!name){
            return res.send({message : " Category name is required "})
        }
        if(!icon){
            return res.send({message : " Icon in String is required "})
        }
        // Check an Existing category
        const existing = await categoryModel.findOne({name})
        if(existing){
            return res.status(200).send({
                success : false,
                message : " Category already Exists ",
            })
        }
        // Save category in DB
        const cat = await new categoryModel({name , icon}).save();
        res.status(201).send({
            success : true,
            message : "Category added successfully",
            cat,
        })
    }
    catch(error){
        res.status(500).send({
            success : false,
            message : "Error in Adding Category",
            error
        })
    }
}

// Get Category Controller Function
export const getCategoryController = async(req,res) => {
    try{
        const category = await categoryModel.find({})
        res.status(200).send({
            success : true,
            message : "All category List",
            category,
        })
    }
    catch(error){
        res.status(500).send({
            success : false,
            message : "Error in Getting Category",
            error,
        })
    }
}

// Delete Category Controller function for ADMIN only
export const deleteCategoryController = async(req,res) => {
    try{
        const {id} = req.params;  // Delete by id only
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success : true,
            message : "deleted Category Successfully",
        });
    }
    catch(error){
        res.status(500).send({
            success : false,
            error,
            message : "Error while deleting category",
        })
    }
}    

// Updating Category Controller Function
export const updateCategoryController = async(req,res) => {
    try{
        const { name , icon } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id , {name,icon} , {new : true})
        res.status(200).send({
            success : true,
            message : "Category updated successfully",
            category,
        })
    }
    catch(error){
        res.status(500).send({
            success : false,
            message : "Error while updating category",
            error,
        })
    }
}