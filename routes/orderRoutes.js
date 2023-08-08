import express from "express";
const router = express.Router();
import { requireSignIn , isAdmin } from "../middlewares/authMiddleware.js";
import { 
    placingOrder , 
    getAllOrders , 
    updateUserArray , 
    getOwnOrder ,
    updateOrderStatus ,
    orderDetails ,
} from "../controllers/orderController.js";

// Placing order route for loggedin user
router.post('/place-order/:uid/:pid' , requireSignIn , placingOrder);

// Updating User Model Array of Orders
router.patch('/update-order-array/:uid/:oid' , requireSignIn , updateUserArray);

// Get all Orders     /* ADMIN ONLY ROUTE */
router.get('/get-all/:page' , requireSignIn , isAdmin , getAllOrders); 

// Get own order by user_id
router.get('/get-own-order/:uid' , requireSignIn, getOwnOrder);

// Get Single order by oid    FOR ORDER DETAILS (ADMIN / USER route)
router.get('/order-detail/:oid' , requireSignIn , orderDetails); 

// Update order status
router.patch('/change-order-status/:oid/:status' , requireSignIn , isAdmin , updateOrderStatus);

export default router;