import express from "express";
import {
  createQuiz,
  getQuizDetails,
  getClassroomQuizzes,
  submitQuiz,
} from "../controllers/quizController.js";
import { protect } from "../middlewares/auth.js";

const quizRoutes = express.Router();

// PUBLIC ROUTES (if any)
// Example: Fetch public quizzes (if needed)
// quizRoutes.get("/public", getPublicQuizzes);

// PROTECTED ROUTES
// Create a new quiz (teacher only)
quizRoutes.post("/create", protect, createQuiz);

// Get details of a specific quiz
quizRoutes.get("/:id", protect, getQuizDetails);

// Get all quizzes for a specific classroom
quizRoutes.get("/classroom/:classroomId", protect, getClassroomQuizzes);

// Submit quiz answers (student only)
quizRoutes.post("/:id/submit", protect, submitQuiz);

export default quizRoutes;
