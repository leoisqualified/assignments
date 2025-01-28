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
