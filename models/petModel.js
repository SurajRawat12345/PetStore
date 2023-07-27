const mongoose = require("mongoose");

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
            required : true,
        },
        url:{
            type: String,
            required: true,
        },
    },
    orders:[
        {
            type : mongoose.ObjectId,
            ref : 'orders',
        }
    ],
},{timestamps : true})

module.exports = mongoose.model("pets" , petSchema);