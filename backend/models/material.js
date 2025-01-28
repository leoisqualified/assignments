import Material from "../models/material.js";

// Upload a new material (teacher only)
export const uploadMaterial = async (req, res) => {
  const { classroomId, fileUrl, title, description } = req.body;
  const uploadedBy = req.user.userId; // Extracted from JWT token
  const userRole = req.user.role; // Extracted from JWT token

  // Check if the user is a teacher
  if (userRole !== "teacher") {
    throw new Error("Unauthorised Request");
  }

  // Validate input
  if (!classroomId || !fileUrl || !title) {
    throw new Error("Classroom ID, file URL, and title are required");
  }

  // Create new material
  const newMaterial = new Material({
    classroom: classroomId,
    fileUrl,
    title,
    description,
    uploadedBy,
  });

  // Save material to database
  await newMaterial.save();

  // Respond with success message and material details
  res.status(201).json({
    message: "Material uploaded successfully",
    material: newMaterial,
  });
};
