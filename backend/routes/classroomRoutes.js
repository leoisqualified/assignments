import express from "express";
import {
  createClassroom,
  joinClassroom,
  getClassroomDetails,
  getAllClassrooms,
} from "../controllers/classroomController.js";
import { protect } from "../middlewares/auth.js";

const classroomRoutes = express.Router();

// PROTECTED ROUTES...
classroomRoutes.use(protect);
// Create a new classroom (teacher only)
classroomRoutes.post("/create", createClassroom);

// Join a classroom (student only)
classroomRoutes.post("/join", joinClassroom);

// Get details of a specific classroom
classroomRoutes.get("/:id", getClassroomDetails);

// Get all classrooms for the logged-in user (teacher or student)
classroomRoutes.get("/", getAllClassrooms);

export default classroomRoutes;
