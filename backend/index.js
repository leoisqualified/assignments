import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import classroomRoutes from "./routes/classroomRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import gradesRoutes from "./routes/gradesRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";

// Initialize express app
const app = express();

// Load environment variables
dotenv.config();

const PORT = 5000;

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/classrooms", classroomRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/grades", gradesRoutes);
app.use("/api/materials", materialRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
