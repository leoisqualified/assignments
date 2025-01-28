import Quiz from "../models/quiz.js";
import Grade from "../models/grade.js"; // Assuming you use this for grades

// Create a new quiz (teacher only)
export const createQuiz = async (req, res) => {
  const { title, questions, classroomId } = req.body;

  if (!title || !questions || !classroomId) {
    throw new Error("Title, questions, and classroom ID are required");
  }

  const newQuiz = new Quiz({
    title,
    questions,
    classroom: classroomId,
  });

  await newQuiz.save();

  res.status(201).json({
    message: "Quiz created successfully",
    quiz: newQuiz,
  });
};

// Submit quiz answers (student only)
export const submitQuiz = async (req, res) => {
  const { quizId, answers } = req.body;
  const studentId = req.user.userId;

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new Error("Quiz not found");
  }

  // Calculate score
  let score = 0;
  quiz.questions.forEach((question, index) => {
    if (question.correctAnswer === answers[index]) {
      score++;
    }
  });

  // Save grade
  const grade = new Grade({
    student: studentId,
    quiz: quizId,
    score,
  });

  await grade.save();

  res.status(200).json({
    message: "Quiz submitted successfully",
    score,
  });
};

// Get details of a specific quiz
export const getQuizDetails = async (req, res) => {
  const { id } = req.params; // Quiz ID from the URL params

  const quiz = await Quiz.findById(id)
    .populate("classroom", "name") // Populate classroom details
    .populate("questions"); // Optionally populate question details if stored in another schema

  if (!quiz) {
    throw new Error("Quiz not found");
  }

  res.status(200).json({
    message: "Quiz details fetched successfully",
    quiz,
  });
};

// Get all quizzes for a specific classroom
export const getClassroomQuizzes = async (req, res) => {
  const { classroomId } = req.params;

  const quizzes = await Quiz.find({ classroom: classroomId });

  if (!quizzes || quizzes.length === 0) {
    throw new Error("No quizzes found for this classroom");
  }

  res.status(200).json({
    message: "Classroom quizzes fetched successfully",
    quizzes,
  });
};
