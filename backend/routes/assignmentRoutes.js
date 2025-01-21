import express from "express";
import {
  createAssignment,
  getClassroomAssignments,
  submitAssignment,
  gradeSubmission,
} from "../controllers/assignmentController.js";

const router = express.Router();

// Create a new assignment
router.post("/create", createAssignment);

// Get all assignments for a specific classroom
router.get("/:classroomId", getClassroomAssignments);

// Submit an assignment
router.post("/:assignmentId/submit", submitAssignment);

// Grade an assignment submission
router.put("/:assignmentId/grade/:studentId", gradeSubmission);

export default router;
