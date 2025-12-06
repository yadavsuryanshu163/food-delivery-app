// controllers/cartController.js
import userModel from "../models/userModel.js";

// add item to user cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;         // ✅ from auth middleware
    const { itemId } = req.body;

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // cartData is just an object, no await
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// remove from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;         // ✅ from auth middleware
    const { itemId } = req.body;

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;

      // optional: delete item when it reaches 0
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// fetch user cart details
const getCart = async (req, res) => {
  try {
    const userId = req.userId;         // ✅ from auth middleware

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export { addToCart, removeFromCart, getCart };
