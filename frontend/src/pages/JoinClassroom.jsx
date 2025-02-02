import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinClassroom } from "../redux/classroomSlice";
import "./JoinClassroom.css";

const JoinClassroom = () => {
  const [classroomId, setClassroomId] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.classroom);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(joinClassroom(classroomId));
    setClassroomId(""); // Clear input after submission
  };

  return (
    <div className="container">
      <h2 className="title">Join a Classroom</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Classroom ID"
          className="input-field"
          value={classroomId}
          onChange={(e) => setClassroomId(e.target.value)}
          required
        />
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Joining..." : "Join Classroom"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default JoinClassroom;
