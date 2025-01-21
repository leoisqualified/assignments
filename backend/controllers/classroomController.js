import Classroom from "../models/Classroom.js"; // Import Classroom model
import User from "../models/User.js"; // Import User model

// Create a new classroom
export const createClassroom = async (req, res) => {
  const { name, semester, teacherId } = req.body;

  try {
    const classroom = new Classroom({ name, semester, teacherId });
    await classroom.save();
    res.status(201).json(classroom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get classrooms created by a teacher
export const getTeacherClassrooms = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const classrooms = await Classroom.find({ teacherId });
    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Join a classroom as a student
export const joinClassroom = async (req, res) => {
  const { classroomId } = req.params;
  const { studentId } = req.body;

  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom.students.includes(studentId)) {
      classroom.students.push(studentId);
      await classroom.save();
    }

    res.status(200).json({ message: "Student added to classroom" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
