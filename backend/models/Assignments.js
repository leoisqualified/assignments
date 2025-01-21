import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    classroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: true,
    },
    dueDate: { type: Date, required: true },
    fileUrl: String, // Link to the uploaded assignment file
    submissions: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        fileUrl: String, // Link to the student's submitted file
        grade: Number, // Grade assigned by the teacher
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
