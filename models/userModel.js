import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("Not a valid Email");
            }
        }
    },
    password:{
        type: String,
        required: true,
    },
    isadmin:{
        type: Boolean,
        default: false,
    },
    orders:[
        {
            type : mongoose.ObjectId,
            ref : 'orders',
        }
    ],
},{timestamps:true})

export default mongoose.model("users",userSchema);