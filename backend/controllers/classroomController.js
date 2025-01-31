import Classroom from "../models/classroom.js";

// Create a new classroom (teacher only)
export const createClassroom = async (req, res) => {
  try {
    const { name } = req.body;
    const teacherId = req.user.userId;

    if (!name) {
      return res.status(400).json({ error: "Classroom name is required" });
    }

    const newClassroom = new Classroom({
      name,
      teacher: teacherId,
      students: [],
    });

    await newClassroom.save();

    res.status(201).json({
      message: "Classroom created successfully",
      classroom: newClassroom,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create classroom" });
  }
};

// Join a classroom (student only)
export const joinClassroom = async (req, res) => {
  const { classroomId } = req.body;
  const studentId = req.user.userId; // Get the logged-in student ID

  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    // Check if the student is already in the classroom
    if (classroom.students.includes(studentId)) {
      return res
        .status(400)
        .json({ error: "You have already joined this classroom" });
    }

    // Add the student to the classroom
    classroom.students.push(studentId);
    await classroom.save();

    res.status(200).json({
      message: "Joined classroom successfully",
      classroom,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to join classroom" });
  }
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
