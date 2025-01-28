import Quiz from "../models/quiz.js";

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
