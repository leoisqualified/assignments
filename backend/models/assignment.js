import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom",
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["multiple-choice", "text", "coding"],
    required: true,
  },
  questions: [
    {
      question: { type: String, required: false }, // Optional for text/coding assignments
      options: [{ type: String }], // Only used for MCQs
      correctAnswer: { type: String }, // Only for MCQs
    },
  ],
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
