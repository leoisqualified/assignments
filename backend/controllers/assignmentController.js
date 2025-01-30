import Submission from "../models/submission.js";
import Assignment from "../models/assignment.js";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const submitAssignment = async (req, res) => {
  const { assignmentId, answers } = req.body;
  const studentId = req.user.id; // Get the authenticated student's ID

  try {
    // Check if the assignment exists
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    // Save submission
    const submission = new Submission({
      student: studentId,
      assignment: assignmentId,
      answers,
    });

    await submission.save();

    res.status(201).json({
      message: "Assignment submitted successfully",
      submission,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit assignment" });
  }
};

export const gradeAssignment = async (req, res) => {
  const { submissionId } = req.body;

  try {
    // Get submission
    const submission = await Submission.findById(submissionId).populate(
      "assignment"
    );
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    let score = 0;
    let feedback = "No feedback provided.";

    // Handle multiple-choice grading
    if (submission.assignment.type === "multiple-choice") {
      let correctCount = 0;

      submission.answers.forEach((answer, index) => {
        if (
          answer.selectedOption ===
          submission.assignment.questions[index].correctAnswer
        ) {
          correctCount++;
        }
      });

      score = (correctCount / submission.assignment.questions.length) * 100;
      feedback = `You got ${correctCount} out of ${submission.assignment.questions.length} correct.`;
    }
    // Handle AI grading for text and coding assignments
    else {
      const prompt = `
        You are an AI teaching assistant. Evaluate the following student submission based on the teacher's instructions:
        Assignment: ${submission.assignment.title}
        Student Submission: ${JSON.stringify(submission.answers)}
        Provide scores and detailed feedback.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      });

      const aiResponse = response.choices[0].message.content;
      ({ score, feedback } = parseAIResponse(aiResponse));
    }

    // Update submission with grade
    submission.graded = true;
    submission.score = score;
    submission.feedback = feedback;
    await submission.save();

    res.status(200).json({
      message: "Assignment graded successfully",
      score,
      feedback,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to grade assignment" });
  }
};

// Helper function to parse AI response
const parseAIResponse = (aiResponse) => {
  // Example logic to extract a score and feedback
  return {
    score: Math.floor(Math.random() * 100), // Example: AI provides a score
    feedback: aiResponse, // Use AI-generated feedback
  };
};
