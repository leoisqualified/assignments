import express from "express";
import { protect, roleCheck } from "../middlewares/authMiddleware.js";
import {
  createClassroom,
  getTeacherClassrooms,
  joinClassroom,
} from "../controllers/classroomController.js";

const router = express.Router();

// Define routes
router.post("/create", protect, roleCheck("teacher"), createClassroom);
router.get(
  "/teacher/:teacherId",
  protect,
  roleCheck("teacher"),
  getTeacherClassrooms
);
router.post("/:classroomId/join", protect, roleCheck("student"), joinClassroom);

export default router;
