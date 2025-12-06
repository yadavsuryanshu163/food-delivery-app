import express from "express"
import authMiddleware from "../midleware/auth.js"
import { placeOrder,verifyOrder,userOrders, listorders,updateOrderStatus } from "../controllers/orderController.js"


const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userOrders",authMiddleware,userOrders)
orderRouter.get('/list',listorders)
orderRouter.post("/status", updateOrderStatus);

export default orderRouter;