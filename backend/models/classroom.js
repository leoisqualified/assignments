import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  students: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const classroom = mongoose.model("Classroom", classroomSchema);

export default classroom;
