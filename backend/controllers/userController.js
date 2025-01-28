import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Helper function to generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Register a new user
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate input
  if (!name || !email || !password || !role) {
    throw new Error("All fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // Save user to database
  await newUser.save();

  // Generate JWT token
  const token = generateToken(newUser._id, newUser.role);

  // Respond with user and token
  res.status(201).json({
    message: "User created successfully",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
    token,
  });
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = generateToken(user._id, user.role);

  // Respond with user and token
  res.status(200).json({
    message: "Login successful",
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  });
};

// Get user details
export const getUser = async (req, res) => {
  const userId = req.user.userId; // Extracted from JWT token

  // Find user by ID
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }

  // Respond with user details
  res.status(200).json({
    message: "User details fetched successfully",
    user,
  });
};
