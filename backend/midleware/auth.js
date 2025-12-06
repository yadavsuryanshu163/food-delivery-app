// midleware/auth.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "not authorized login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ store id here
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export default authMiddleware;
