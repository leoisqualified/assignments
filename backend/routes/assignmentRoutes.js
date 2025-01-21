import express from "express";
import {
  createAssignment,
  getClassroomAssignments,
  submitAssignment,
  gradeSubmission,
  uploadAssignmentFile,
  submitAssignment,
  getSubmissions,
} from "../controllers/assignmentController.js";
import upload from "../middlewares/uploadMiddleware.js";

// Create a new assignment
router.post("/create", createAssignment);

// Get all assignments for a specific classroom
router.get("/:classroomId", getClassroomAssignments);

// Submit an assignment
router.post("/:assignmentId/submit", submitAssignment);

// Grade an assignment submission
router.put("/:assignmentId/grade/:studentId", gradeSubmission);

const router = express.Router();

// Teacher uploads an assignment file
router.post(
  "/:assignmentId/upload",
  upload.single("file"),
  uploadAssignmentFile
);

// Student submits an assignment
router.post("/:assignmentId/submit", upload.single("file"), submitAssignment);

// Get all submissions for an assignment
router.get("/:assignmentId/submissions", getSubmissions);

export default router;
