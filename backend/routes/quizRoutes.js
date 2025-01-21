import express from "express";
import {
  createQuiz,
  getClassroomQuizzes,
  attemptQuiz,
  getStudentQuizAttempts,
} from "../controllers/quizController.js";

const router = express.Router();

// Create a new quiz
router.post("/", createQuiz);

// Get all quizzes for a specific classroom
router.get("/:classroomId", getClassroomQuizzes);

// Attempt a quiz
router.post("/:quizId/attempt", attemptQuiz);

// Get attempts of a quiz for a specific student
router.get("/:quizId/attempts/:studentId", getStudentQuizAttempts);

export default router;
