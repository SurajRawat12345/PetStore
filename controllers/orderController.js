import orderModel from '../models/orderModel.js' ;
import userModel from '../models/userModel.js';
import petModel from '../models/petModel.js';

// Placing order route for all
export const placingOrder = async(req,res) => {
    try{
        const {pid} = req.params;
        const {uid} = req.params;
        const orderPlaced = await orderModel({
            pet : pid,
            userBuyed : uid,
        }).save();
        res.send({
            success : true,
            msg : "Order Placed",
            orderPlaced,
        })
    }
    catch(err){
        res.status(500).send({
            success : false,
            msg : "Error in Placing Order",
            err,
        })
    }
}

// updating order array in user model
export const updateUserArray = async(req,res) => {
    try{
        const {uid} = req.params;
        const {oid} = req.params;
        const {pid} = req.params;
        const findUser = await userModel.findOneAndUpdate(
            {_id : uid},
            {$push: { orders : oid }},
            {new: true},
        )
        const petOwner = await petModel.findOneAndUpdate(
            {_id: pid},
            {$push: {orders: oid}},
            {new: true},
        )
        res.status(200).send({
            success: true,
            msg: "Updated order array",
            findUser: {
                orders : findUser.orders,
            },
            petOwner: {
                orders: petOwner.orders,
            }
        })
    }
    catch(err){
        res.status(500).send({
            success : false,
            msg : "Error in Updating Order in User",
            err,
        })
    }
}

// ADMIN get all order controller
export const getAllOrders = async(req,res) => {
    try{
        const perPage = 5;
        const page = req.params.page ? (req.params.page) : (1);
        const allOrders = await orderModel.find({})
        .limit(perPage*page)
        .sort({createdAt: -1});
        const images = [] , userNames = [];
        for(let i = 0 ; i < allOrders.length ; i++){
            const abc = await petModel.findOne({_id: allOrders[i].pet});
            images.push(abc.image);
            const def = await userModel.findOne({_id: allOrders[i].userBuyed});
            userNames.push(def.name);
        }
        res.status(200).send({
            success: true,
            msg: "Fetched all Orders",
            allOrders,
            images,
            userNames,
        })
    }
    catch(err){
        res.status(500).send({
            success : false,
            msg : "Error in getting all Order",
            err,
        })
    }
}

// Own Orders
export const getOwnOrder = async(req,res) => {
    try{
        const{uid} = req.params;
        const myOrder = await orderModel.find({userBuyed: uid}); 
        const arr = [];
        for(let i = 0 ; i < myOrder.length ; i++){
            const abc = await petModel.findOne({_id: myOrder[i].pet});
            arr.push(abc);
        }
        res.status(200).send({
            success : true,
            msg : "Getting Own Orders",
            myOrder,
            arr,
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success : false,
            msg : "Error in getting Order",
            err,
        })
    }
}

// ORDER DETAIL
export const orderDetails = async(req,res) => {
    try{
        const {oid} = req.params;
        const order_detail = await orderModel.findOne({_id : oid});
        const pet_ordered = await petModel.findOne({_id : order_detail.pet});
        const user_ordered = await userModel.findOne({_id : order_detail.userBuyed});
        res.status(200).send({
            success : true,
            msg : "Order Fetched successfully",
            order_detail,
            pet_ordered : {
                image : pet_ordered.image,
                _id : pet_ordered._id,
                name : pet_ordered.name,
                species : pet_ordered.species,
                price : pet_ordered.price,
            },
            user_ordered : {
                name : user_ordered.name,
                _id : user_ordered._id,
            } ,
        }) 
    }
    catch(err){
        res.status(500).send({
            success : true,
            msg : "Order not Fetched Properly",
            err,
        })
    }
}

// Update Order status  /* ADMIN */
export const updateOrderStatus = async(req,res) => {
    try{
        const { oid } = req.params;
        const { status } = req.params;
        const updateOrder = await orderModel.findOneAndUpdate(
            {_id : oid},
            { status} , 
            {new : true},
        )
        res.status(200).send({
            success : true,
            msg : "Status Updated successfully",
            updateOrder,
        })
    }
    catch(err){
        res.status(500).send({
            success : false,
            msg : "Error while updating status",
            err,
        })
    }
}