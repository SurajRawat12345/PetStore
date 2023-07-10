import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from 'jsonwebtoken';

// ----------------------- SIGNUP OR REGISTER ---------------------------
export const registerController = async(req,res) => {
    try{
        const { name , email , password } = req.body;
        if(!name){
            return res.send({message : "Name is required"})
        }
        if(!email){
            return res.send({message : "Email is required"})
        }
        if(!password){
            return res.send({message : "password is required"})
        }
        
        // Check an Existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success : false,
                message : "Already Registered please login",
            })
        }
        // Registering user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({name,email,password:hashedPassword}).save();
        res.status(201).send({
            success : true,
            message : "User Registered successfully",
            user
        })
    }
    catch(error){
        res.status(500).send({
            success : false,
            message : "Error in registration",
            error
        })
    }
}

// --------------------------- LOGIN ---------------------------------
export const loginController = async(req,res) => {
    try{
        const {email , password} = req.body;
        // validation
        if(!email || !password){
            return res.send({
                success : false,
                message : "Invalid login credentials"
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.send({
                success : false,
                message : "Email is not registered",
            })
        }
        const match = await comparePassword(password , user.password)
        if(!match){
            return res.send({
                success : false,
                message : "Invalid password"
            })
        };
        // token creation
        const token = await JWT.sign({ _id : user._id} , process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie("token" , token , {
            expires : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly : true
        });
        res.status(200).send({
            success : true,
            message : "login successfully",
            user : {
                _id : user._id,
                name : user.name,
                email : user.email,
            },
            token,
        })
    }
    catch(error){
        res.status(500).send({
            success : false,
            message : "Error in login",
            error
        })
    }
}