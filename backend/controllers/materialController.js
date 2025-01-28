import Material from "../models/material.js";

// Upload a new material (teacher only)
export const uploadMaterial = async (req, res) => {
  const { classroomId, fileUrl } = req.body;

  if (!classroomId || !fileUrl) {
    throw new Error("Classroom ID and file URL are required");
  }

  const newMaterial = new Material({
    classroom: classroomId,
    fileUrl,
  });

  await newMaterial.save();

  res.status(201).json({
    message: "Material uploaded successfully",
    material: newMaterial,
  });
};
