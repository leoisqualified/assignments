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

// Get all materials for a specific classroom
export const getClassroomMaterials = async (req, res) => {
  const { classroomId } = req.params;

  // Fetch materials for the given classroom ID
  const materials = await Material.find({ classroom: classroomId });

  if (!materials || materials.length === 0) {
    return res
      .status(404)
      .json({ message: "No materials found for this classroom" });
  }

  res.status(200).json({
    message: "Classroom materials fetched successfully",
    materials,
  });
};
