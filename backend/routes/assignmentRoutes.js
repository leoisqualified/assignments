import express from "express";
import {
  createAssignment,
  getClassroomAssignments,
  submitAssignment,
  gradeSubmission,
  uploadAssignmentFile,
  getSubmissions,
} from "../controllers/assignmentController.js";
import upload from "../middlewares/uploadMiddleware.js";
import { protect, roleCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new assignment (Only teachers can create assignments)
router.post("/create", protect, roleCheck("teacher"), createAssignment);

// Get all assignments for a specific classroom (Accessible by both students and teachers)
router.get("/:classroomId", protect, getClassroomAssignments);

// Submit an assignment (Only students can submit assignments)
router.post(
  "/:assignmentId/submit",
  protect,
  roleCheck("student"),
  upload.single("file"),
  submitAssignment
);

// Grade an assignment submission (Only teachers can grade submissions)
router.put(
  "/:assignmentId/grade/:studentId",
  protect,
  roleCheck("teacher"),
  gradeSubmission
);

// Teacher uploads an assignment file (Only teachers can upload assignment files)
router.post(
  "/:assignmentId/upload",
  protect,
  roleCheck("teacher"),
  upload.single("file"),
  uploadAssignmentFile
);

// Get all submissions for an assignment (Only teachers can view submissions)
router.get(
  "/:assignmentId/submissions",
  protect,
  roleCheck("teacher"),
  getSubmissions
);

export default router;
