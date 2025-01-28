import express from "express";
import { createUser } from "../controllers/userController.js";

const userRoutes = express.Router();

// register a user
userRoutes.post("/create", createUser);

export default userRoutes;
