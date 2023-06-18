import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    species:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    likes:[
        {
            type : mongoose.ObjectId,
            ref : 'users',
        },
    ],
    image:{
        public_id : {
            type : String,
            default : "",
        },
        url:{
            type: String,
            default : "",
        },
    },
    orders:[
        {
            type : mongoose.ObjectId,
            ref : 'orders',
        }
    ],
},{timestamps:true})

export default mongoose.model("pets",petSchema);