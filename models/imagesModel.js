import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    image_url:{
        type: String,
        required: true,
    },
},{timestamps : true})

export default mongoose.model("images" , imageSchema);