import Grade from "../models/grade.js";

// Fetch grades for a student
export const getStudentGrades = async (req, res) => {
  const { studentId } = req.params;

  const grades = await Grade.find({ student: studentId }).populate("quiz");

  res.status(200).json({
    message: "Grades fetched successfully",
    grades,
  });
};
