import moongosse from "mongoose"

const userSchema=new moongosse.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

const userModel=moongosse.model.user || moongosse.model("user",userSchema);
export default userModel;