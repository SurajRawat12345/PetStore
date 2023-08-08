import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    pet : {
        type : mongoose.ObjectId,
        ref : 'pets',
    },   
    userBuyed : {
        type : mongoose.ObjectId,
        ref : 'users',
    },
    status: {
        type: String,
        default: "Placed",
        enum: ["Placed", "Processing", "Shipped", "deliverd", "cancelled"],
    },
    date:{
        type: Date,
        default: Date.now,
    }
},{timestamps:true})

export default mongoose.model("orders",orderSchema);