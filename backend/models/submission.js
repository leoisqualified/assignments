import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
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
  answers: [
    {
      question: { type: String, required: false }, // Not required for coding/text assignments
      selectedOption: { type: String }, // Used for MCQs
      textAnswer: { type: String }, // Used for text-based answers
      codeAnswer: { type: String }, // Used for coding assignments
    },
  ],
  submittedAt: { type: Date, default: Date.now },
  graded: { type: Boolean, default: false }, // True if AI has graded it
  score: { type: Number }, // Optional field for MCQs
  feedback: { type: String }, // AI feedback for text/coding assignments
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
