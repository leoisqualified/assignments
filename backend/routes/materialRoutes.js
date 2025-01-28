import express from "express";
import {
  uploadMaterial,
  getClassroomMaterials,
} from "../controllers/materialController.js";
import { protect } from "../middlewares/auth.js";

const materialRoutes = express.Router();

// PUBLIC ROUTES (if any)
// Example: Fetch public materials (if needed)
// materialRoutes.get("/public", getPublicMaterials);

// PROTECTED ROUTES
// Upload a new material (teacher only)
materialRoutes.post("/upload", protect, uploadMaterial);

// Fetch all materials for a specific classroom
materialRoutes.get("/classroom/:classroomId", protect, getClassroomMaterials);

export default materialRoutes;
