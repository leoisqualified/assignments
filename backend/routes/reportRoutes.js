import express from "express";
import {
  createOrUpdateReport,
  getClassroomReports,
  getStudentReport,
} from "../controllers/reportController.js";

const router = express.Router();

// Create or update a report
router.post("/", createOrUpdateReport);

// Get all reports for a classroom
router.get("/:classroomId", getClassroomReports);

// Get a specific report for a student in a classroom
router.get("/:classroomId/:studentId", getStudentReport);

export default router;
