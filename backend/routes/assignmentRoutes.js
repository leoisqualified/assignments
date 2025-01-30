import express from "express";
import {
  submitAssignment,
  gradeAssignment,
} from "../controllers/assignmentController.js";
import { protect } from "../middlewares/auth.js";

const assignmentRoutes = express.Router();

// Protect all routes below this middleware
assignmentRoutes.use(protect);

// Student submits an assignment
assignmentRoutes.post("/submit", submitAssignment);

// AI or teacher grades the assignment
assignmentRoutes.post("/grade", gradeAssignment);

export default assignmentRoutes;
