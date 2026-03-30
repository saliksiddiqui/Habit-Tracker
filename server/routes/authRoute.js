import express from "express";
import { fetchUser, register, userlogin } from "../controllers/auth.js";
import { protect } from "../middlewares/authentication.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", userlogin);
authRoutes.get("/me", protect, fetchUser)


export default authRoutes;