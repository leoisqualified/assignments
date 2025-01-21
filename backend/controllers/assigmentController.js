import Assignment from "../models/Assignment.js";

// Create a new assignment
export const createAssignment = async (req, res) => {
  const { title, description, classroomId, dueDate } = req.body;

  try {
    const assignment = new Assignment({
      title,
      description,
      classroomId,
      dueDate,
    });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get assignments for a specific classroom
export const getClassroomAssignments = async (req, res) => {
  const { classroomId } = req.params;

  try {
    const assignments = await Assignment.find({ classroomId });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Submit assignment (for students)
export const submitAssignment = async (req, res) => {
  const { assignmentId } = req.params;
  const { studentId } = req.body;

  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Save the student's submission
    assignment.submissions.push({
      studentId,
      fileUrl: `/uploads/${req.file.filename}`,
    });
    await assignment.save();

    res
      .status(200)
      .json({ message: "Assignment submitted successfully", assignment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Grade an assignment submission
export const gradeSubmission = async (req, res) => {
  const { assignmentId, studentId } = req.params;
  const { grade } = req.body;

  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const submission = assignment.submissions.find(
      (submission) => submission.studentId.toString() === studentId
    );

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    submission.grade = grade; // Update the grade
    await assignment.save();
    res.status(200).json({ message: "Grade updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload assignment file (for teachers)
export const uploadAssignmentFile = async (req, res) => {
  const { assignmentId } = req.params;

  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Save the uploaded file's URL to the assignment
    assignment.fileUrl = `/uploads/${req.file.filename}`;
    await assignment.save();

    res.status(200).json({ message: "File uploaded successfully", assignment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all submissions for an assignment (for teachers)
export const getSubmissions = async (req, res) => {
  const { assignmentId } = req.params;

  try {
    const assignment = await Assignment.findById(assignmentId).populate(
      "submissions.studentId",
      "name email"
    );
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json(assignment.submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
