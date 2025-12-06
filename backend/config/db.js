import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://yadavsuryanshu163:9773610607@cluster0.lgab6kl.mongodb.net/food').then(()=>console.log("DB connected"));
}