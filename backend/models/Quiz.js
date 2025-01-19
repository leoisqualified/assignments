import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    classroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: true,
    },
    questions: [
      {
        question: { type: String, required: true },
        options: [String], // Array of options
        correctAnswer: String, // The correct answer
      },
    ],
    attempts: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        score: Number, // Score obtained by the student
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
