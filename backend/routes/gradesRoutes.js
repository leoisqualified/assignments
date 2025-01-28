import express from "express";
import {
  getStudentGrades,
  getClassroomGrades,
  getQuizGrades,
} from "../controllers/gradeController.js";
import { protect } from "../middlewares/auth.js";

const gradeRoutes = express.Router();

// PUBLIC ROUTES (if any)
// Example: Fetch public grades (if needed)
// gradeRoutes.get("/public", getPublicGrades);

// PROTECTED ROUTES
// Get all grades for a specific student
gradeRoutes.get("/student/:studentId", protect, getStudentGrades);

// Get all grades for a specific classroom
gradeRoutes.get("/classroom/:classroomId", protect, getClassroomGrades);

// Get all grades for a specific quiz
gradeRoutes.get("/quiz/:quizId", protect, getQuizGrades);

export default gradeRoutes;
