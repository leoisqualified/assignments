import express from "express";
import {
  createClassroom,
  getTeacherClassrooms,
  joinClassroom,
} from "../controllers/classroomController.js";

const router = express.Router();

// Define routes
router.post("/create", createClassroom);
router.get("/teacher/:teacherId", getTeacherClassrooms);
router.post("/:classroomId/join", joinClassroom);

export default router;
