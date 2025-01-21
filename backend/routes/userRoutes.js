import express from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
  getUsersByRole,
} from "../controllers/userController.js";

const router = express.router();

// Register a user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Get user details by ID
router.get("/:userId", getUserDetails);

// Get users by role (e.g., "teacher" or "student")
router.get("/role/:role", getUsersByRole);

export default router;
