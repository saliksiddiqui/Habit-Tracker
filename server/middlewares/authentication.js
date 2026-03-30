import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  if (
    !req.headers.authorization &&
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(401).json({ message: "Not authorised! No token" });
  }
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    return next();
  } catch (err) {
    console.error("Authorization Failed", err.message);
    return res.status(401).json({ message: "Not authorised! No token" });
  }
};
