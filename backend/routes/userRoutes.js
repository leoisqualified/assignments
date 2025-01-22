import express from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
  getUsersByRole,
} from "../controllers/userController.js";
import { protect, roleCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register a user (Open to all, no authentication required)
router.post("/register", registerUser);

// Login a user (Open to all, no authentication required)
router.post("/login", loginUser);

// Get user details by ID (Only accessible by the user themselves or an admin/teacher)
router.get(
  "/:userId",
  protect,
  (req, res, next) => {
    if (req.user.id === req.params.userId || req.user.role === "teacher") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
  },
  getUserDetails
);

// Get users by role (Only teachers or admins can fetch users by role)
router.get("/role/:role", protect, roleCheck("teacher"), getUsersByRole);

export default router;
