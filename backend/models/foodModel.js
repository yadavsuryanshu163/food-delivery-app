import mongoose from "mongoose";
import fs from 'fs'

const foodSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  category:    { type: String, required: true },
  image:       { type: String, required: false },
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
