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

// Fetch grades for a specific classroom
export const getClassroomGrades = async (req, res) => {
  const { classroomId } = req.params;

  // Find grades associated with the classroom
  const grades = await Grade.find({ classroom: classroomId })
    .populate("student", "name email") // Populate student details
    .populate("quiz", "title"); // Populate quiz details

  if (!grades || grades.length === 0) {
    return res
      .status(404)
      .json({ message: "No grades found for this classroom" });
  }

  res.status(200).json({
    message: "Classroom grades fetched successfully",
    grades,
  });
};

// Fetch grades for a specific quiz
export const getQuizGrades = async (req, res) => {
  const { quizId } = req.params;

  // Find grades associated with the quiz
  const grades = await Grade.find({ quiz: quizId })
    .populate("student", "name email") // Populate student details
    .populate("quiz", "title"); // Populate quiz details

  if (!grades || grades.length === 0) {
    return res.status(404).json({ message: "No grades found for this quiz" });
  }

  res.status(200).json({
    message: "Quiz grades fetched successfully",
    grades,
  });
};
