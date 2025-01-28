import Classroom from "../models/classroom.js";

// Create a new classroom (teacher only)
export const createClassroom = async (req, res) => {
  const { name } = req.body;
  const teacherId = req.user.userId;

  if (!name) {
    throw new Error("Classroom name is required");
  }

  const newClassroom = new Classroom({
    name,
    teacher: teacherId,
  });

  await newClassroom.save();

  res.status(201).json({
    message: "Classroom created successfully",
    classroom: newClassroom,
  });
};

// Join a classroom (student only)
export const joinClassroom = async (req, res) => {
  const { classId } = req.body;
  const studentId = req.user.userId;

  const classroom = await Classroom.findById(classId);
  if (!classroom) {
    throw new Error("Classroom not found");
  }

  classroom.students.push(studentId);
  await classroom.save();

  res.status(200).json({
    message: "Joined classroom successfully",
    classroom,
  });
};

// Get details of a specific classroom
export const getClassroomDetails = async (req, res) => {
  const { id } = req.params; // Classroom ID from the URL params

  const classroom = await Classroom.findById(id)
    .populate("teacher", "name email") // Populate teacher details (e.g., name, email)
    .populate("students", "name email"); // Populate student details (e.g., name, email)

  if (!classroom) {
    throw new Error("Classroom not found");
  }

  res.status(200).json({
    message: "Classroom details fetched successfully",
    classroom,
  });
};

// Get all classrooms (teacher or student)
export const getAllClassrooms = async (req, res) => {
  const userId = req.user.userId;

  // Find classrooms where the user is a teacher or student
  const classrooms = await Classroom.find({
    $or: [{ teacher: userId }, { students: userId }],
  }).populate("teacher", "name email"); // Populate teacher details for all classrooms

  res.status(200).json({
    message: "Classrooms fetched successfully",
    classrooms,
  });
};
