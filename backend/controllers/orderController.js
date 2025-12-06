// controllers/orderController.js
import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const { items, amount, address } = req.body;   // 👈 read from body

    if (!items || !items.length) {
      return res.json({ success: false, message: "No items in order" });
    }

    const newOrder = new orderModel({
      userId: req.userId,   // 👈 see next section
      items,
      amount,
      address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        // 👇 Stripe expects "usd" etc., NOT "dollar"
        currency: "usd",
        product_data: {
          name: item.name,
        },
        // make sure price is a number
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.quantity,
    }));

    // delivery charge
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    return res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "error creating order" });
  }
  
};

const verifyOrder=async(req,res)=>{
    const {orderId,success}=req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

//user orders for frontend
const userOrders=async(req,res)=>{

  try {
    const orders=await orderModel.find({userId:req.userId})
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error})
    
  }

}

//listing orders for admin pannel
const listorders=async(req,res)=>{
  try {
     const orders=await orderModel.find({})
     res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
    
  }
}



const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.json({ success: false, message: "OrderId and status required" });
    }

    await orderModel.findByIdAndUpdate(orderId, { status });

    return res.json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating status" });
  }
};


export {verifyOrder,userOrders,listorders,updateOrderStatus}
