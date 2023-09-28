import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Protected route token based
export const requireSignIn = async(req, res , next) => {
    try{
        const {token} = req.cookies;
        const verifyUser = await JWT.verify(token , process.env.JWT_SECRET);
        const rootUser = await userModel.findOne({_id : verifyUser._id});
        if(!rootUser){
            return res.status(401).send({
                success: false,
                msg: "User Not Found",
            })
        }
        req.user = verifyUser; // Removes undefined_id or decoding
        next();
    }
    catch(error){
        res.status(500);
    }    
}

// Admin access
export const isAdmin = async(req,res,next) => {
    try{
        const user = await userModel.findById(req.user._id);
        if(user.isadmin !== true){
            return res.status(401).send({
                success : false,
                message : "unathorized access"
            })
        }
        else{
            next();
        }
    }
    catch(error){
        res.status(401).send({
            success : false,
            message : "Error in admin middleware",
            error
        })
    }
}