import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClassroom } from "../redux/classroomSlice";
import "./CreateClassroom.css";

const CreateClassroom = () => {
  const [className, setClassName] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.classroom);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createClassroom({ name: className }));
    setClassName(""); // Clear input after submission
  };

  return (
    <div className="container">
      <h2 className="title">Create a Classroom</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Classroom Name"
          className="input-field"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Creating..." : "Create Classroom"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CreateClassroom;
