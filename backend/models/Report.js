import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    classroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignmentsGrades: [
      {
        assignmentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Assignment",
        },
        grade: Number,
      },
    ],
    quizScores: [
      {
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
        score: Number,
      },
    ],
    finalGrade: Number, // Final calculated grade
    weightage: {
      assignments: { type: Number, default: 0.6 }, // Weightage for assignments
      quizzes: { type: Number, default: 0.4 }, // Weightage for quizzes
    },
    status: {
      type: String,
      enum: ["in progress", "completed"],
      default: "in progress",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
