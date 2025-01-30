import express from "express";
import {
  createUser,
  loginUser,
  getUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";

const userRoutes = express.Router();

// register a user
userRoutes.post("/register", createUser);

// login a user
userRoutes.post("/login", loginUser);

userRoutes.use(protect);

// PROTECTED ROUTES...
userRoutes.get("/profile", getUser); // get a users profile

export default userRoutes;
