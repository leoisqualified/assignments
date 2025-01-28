import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";

// Initialize express app
const app = express();

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/assignments", userRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
