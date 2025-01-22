import express from "express";
import {
  createQuiz,
  getClassroomQuizzes,
  attemptQuiz,
  getStudentQuizAttempts,
} from "../controllers/quizController.js";
import { protect, roleCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new quiz (Only teachers can create quizzes)
router.post("/", protect, roleCheck("teacher"), createQuiz);

// Get all quizzes for a specific classroom (Accessible by both students and teachers)
router.get("/:classroomId", protect, getClassroomQuizzes);

// Attempt a quiz (Only students can attempt quizzes)
router.post("/:quizId/attempt", protect, roleCheck("student"), attemptQuiz);

// Get attempts of a quiz for a specific student
// Teachers can view attempts for any student; students can view their own attempts
router.get(
  "/:quizId/attempts/:studentId",
  protect,
  (req, res, next) => {
    if (req.user.role === "teacher" || req.user.id === req.params.studentId) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
  },
  getStudentQuizAttempts
);

export default router;
