import express from "express";
import multer from "multer";
import fs from 'fs';
import { addFood,listFood,removeFood} from "../controllers/foodController.js";

const foodRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
  destination: "uploads", // make sure 'uploads' folder exists
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST /api/food/add
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)

export default foodRouter;
