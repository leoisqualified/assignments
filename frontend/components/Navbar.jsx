import React, { useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isLoggedIn = true; // Replace this with actual authentication logic

  return (
    <nav className="navbar">
      <div className="navbar-logo">Assignments</div>
      <button
        className="navbar-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation"
      >
        ☰
      </button>
      <div
        className={`navbar-links ${
          isMobileMenuOpen ? "navbar-links-mobile" : ""
        }`}
      >
        <a href="/classrooms">Classrooms</a>
        <a href="/assignments">Assignments</a>
        <a href="/quizzes">Quizzes</a>
        <a href="/reports">Reports</a>
        {isLoggedIn ? (
          <>
            <a href="/profile">Profile</a>
            <button
              className="logout-button"
              onClick={() => {
                // Add logout logic here
                console.log("Logged out");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
