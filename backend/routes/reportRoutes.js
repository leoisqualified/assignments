import express from "express";
import {
  createOrUpdateReport,
  getClassroomReports,
  getStudentReport,
} from "../controllers/reportController.js";
import { protect, roleCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create or update a report (Only teachers can create or update reports)
router.post("/", protect, roleCheck("teacher"), createOrUpdateReport);

// Get all reports for a classroom (Only teachers can view classroom reports)
router.get("/:classroomId", protect, roleCheck("teacher"), getClassroomReports);

// Get a specific report for a student in a classroom (Students can view their own reports, teachers can view any report)
router.get(
  "/:classroomId/:studentId",
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
  getStudentReport
);

export default router;
