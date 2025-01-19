import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    semester: { type: String, required: true },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    resources: [
      {
        title: String,
        fileUrl: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Classroom", classroomSchema);
