// Protect the routes
export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Attach user info
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

// Check the role of the user
export const roleCheck = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Access denied, insufficient permissions" });
    }
    next();
  };
};
