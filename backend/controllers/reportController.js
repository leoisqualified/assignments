import Report from "../models/Report.js";
import Assignment from "../models/Assignment.js";
import Quiz from "../models/Quiz.js";

// Create or Update a Report
export const createOrUpdateReport = async (req, res) => {
  const { classroomId, studentId, assignmentGrades, quizScores } = req.body;

  try {
    // Check if the report already exists
    let report = await Report.findOne({ classroomId, studentId });

    if (report) {
      // Update the existing report
      if (assignmentGrades) {
        report.assignmentsGrades.push(...assignmentGrades);
      }
      if (quizScores) {
        report.quizScores.push(...quizScores);
      }
      report.finalGrade = calculateFinalGrade(report);
      await report.save();
    } else {
      // Create a new report
      const finalGrade = calculateFinalGrade({
        assignmentsGrades: assignmentGrades,
        quizScores,
      });
      report = new Report({
        classroomId,
        studentId,
        assignmentsGrades: assignmentGrades || [],
        quizScores: quizScores || [],
        finalGrade,
      });
      await report.save();
    }

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Reports for a Classroom
export const getClassroomReports = async (req, res) => {
  const { classroomId } = req.params;

  try {
    const reports = await Report.find({ classroomId }).populate(
      "studentId",
      "name email"
    );
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Report for a Student in a Classroom
export const getStudentReport = async (req, res) => {
  const { classroomId, studentId } = req.params;

  try {
    const report = await Report.findOne({ classroomId, studentId })
      .populate("classroomId", "name")
      .populate("studentId", "name email");
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Calculate Final Grade (Helper Function)
const calculateFinalGrade = (report) => {
  const {
    assignmentsGrades = [],
    quizScores = [],
    weightage = { assignments: 0.6, quizzes: 0.4 },
  } = report;

  const assignmentAvg =
    assignmentsGrades.length > 0
      ? assignmentsGrades.reduce((sum, item) => sum + item.grade, 0) /
        assignmentsGrades.length
      : 0;

  const quizAvg =
    quizScores.length > 0
      ? quizScores.reduce((sum, item) => sum + item.score, 0) /
        quizScores.length
      : 0;

  return assignmentAvg * weightage.assignments + quizAvg * weightage.quizzes;
};
