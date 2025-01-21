import express from "express";
import connectDB from "./config/db";
import classroomRoutes from "./routes/classroomRoutes";
import assignmentRoutes from "./routes/assignmentRoutes";

const app = express();
const port = 3000;

connectDB(); //connect to database

// Middleware
app.use(express.json());

// Routes
app.use("/api/classrooms", classroomRoutes);
app.use("/api/assigments", assignmentRoutes);

// Start server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
