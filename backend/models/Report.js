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
    assignmentsGrades: [Number], // Array of grades for assignments
    quizScores: [Number], // Array of quiz scores
    finalGrade: Number, // Final calculated grade
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
