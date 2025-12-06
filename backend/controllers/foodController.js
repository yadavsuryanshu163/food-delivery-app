import fs from 'fs';
import foodModel from "../models/foodModel.js";

// add food item
const addFood = async (req, res) => {
  try {
    // handle if no file is sent
    const image_filename = req.file ? req.file.filename : null;

    const food = new foodModel({
      name:        req.body.name,
      description: req.body.description,
      price:       req.body.price,
      category:    req.body.category,
      image:       image_filename
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

//add food list
const listFood= async(req,res)=>{
    try{
        const foods= await foodModel.find({});
        res.json({success:true,data:foods })


    }catch(error){
        console.log(error);
        res.json({success:false,message:"error"})
        
    }

}

//remove food item
const removeFood= async(req,res)=>{
    try{
        const food=await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"food removed"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"error"})
        
    }
}


export { addFood,listFood,removeFood};
