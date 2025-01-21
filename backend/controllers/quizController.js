import Quiz from "../models/Quiz.js";

// Create a new quiz
export const createQuiz = async (req, res) => {
  const { title, classroomId, questions, timeLimit, totalScore } = req.body;

  try {
    const quiz = new Quiz({
      title,
      classroomId,
      questions,
      timeLimit,
      totalScore,
    });

    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get quizzes for a specific classroom
export const getClassroomQuizzes = async (req, res) => {
  const { classroomId } = req.params;

  try {
    const quizzes = await Quiz.find({ classroomId });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Attempt a quiz
export const attemptQuiz = async (req, res) => {
  const { quizId } = req.params;
  const { studentId, answers } = req.body; // Answers is an array of student's responses

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Calculate score
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score++;
      }
    });

    const totalScore = (score / quiz.questions.length) * quiz.totalScore;

    // Record the attempt
    quiz.attempts.push({ studentId, score: totalScore });
    await quiz.save();

    res
      .status(200)
      .json({ message: "Quiz submitted successfully", totalScore });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get quiz attempts for a student
export const getStudentQuizAttempts = async (req, res) => {
  const { quizId, studentId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const attempts = quiz.attempts.filter(
      (attempt) => attempt.studentId.toString() === studentId
    );

    if (attempts.length === 0) {
      return res
        .status(404)
        .json({ message: "No attempts found for this student" });
    }

    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
