import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  scores: {
    correctness: { type: Number, required: true },
    efficiency: { type: Number },
    readability: { type: Number },
  },
  feedback: { type: String, required: true },
  aiGraded: { type: Boolean, default: false }, // To track AI-graded submissions
  createdAt: { type: Date, default: Date.now },
});

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;
