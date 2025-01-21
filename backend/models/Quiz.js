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
        options: {
          type: [String], // Array of options
          validate: {
            validator: function (options) {
              return options.length >= 2; // Ensure at least 2 options
            },
            message: "A question must have at least two options.",
          },
        },
        correctAnswer: {
          type: String,
          required: true,
          validate: {
            validator: function (answer) {
              return this.options.includes(answer); // Ensure correctAnswer is in options
            },
            message: "Correct answer must be one of the options.",
          },
        },
      },
    ],
    attempts: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        score: Number, // Score obtained by the student
        submittedAt: { type: Date, default: Date.now }, // Tracks when the attempt was made
      },
    ],
    timeLimit: { type: Number }, // Time limit in minutes
    totalScore: { type: Number, required: true }, // Total score for the quiz
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    }, // Quiz availability status
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
