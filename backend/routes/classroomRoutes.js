import express from "express";
import {
  createClassroom,
  joinClassroom,
  getClassroomDetails,
  getAllClassrooms,
} from "../controllers/classroomController.js";
import { protect } from "../middlewares/auth.js";

const classroomRoutes = express.Router();

// PUBLIC ROUTES (if any)
// Example: Fetch public classrooms (if needed)
// classroomRoutes.get("/public", getPublicClassrooms);

// PROTECTED ROUTES
// Create a new classroom (teacher only)
classroomRoutes.post("/create", protect, createClassroom);

// Join a classroom (student only)
classroomRoutes.post("/join", protect, joinClassroom);

// Get details of a specific classroom
classroomRoutes.get("/:id", protect, getClassroomDetails);

// Get all classrooms for the logged-in user (teacher or student)
classroomRoutes.get("/", protect, getAllClassrooms);

export default classroomRoutes;
