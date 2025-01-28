import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Middleware to protect routes
export const protect = async (req, res, next) => {
  let token;

  // Check if token exists in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user info (without password) to the request object
      req.user = await User.findById(decoded.userId).select("-password");

      next(); // Proceed to the next middleware
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, token missing" });
  }
};

// Middleware to restrict access based on user role
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied, insufficient permissions" });
    }
    next(); // Proceed if the user's role is allowed
  };
};
