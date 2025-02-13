import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassrooms } from "../redux/classroomSlice";
import "../assets/Classroom.css";

const Classroom = () => {
  const dispatch = useDispatch();
  const { classrooms, loading, error } = useSelector(
    (state) => state.classroom
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchClassrooms());
  }, [dispatch]);

  return (
    <div className="classroom-container">
      <h2 className="title">Your Classrooms</h2>
      {loading && <p>Loading classrooms...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="classroom-list">
        {classrooms.length > 0 ? (
          classrooms.map((classroom) => (
            <div key={classroom.id} className="classroom-card">
              <h3>{classroom.name}</h3>
              <p>Class ID: {classroom.id}</p>
              {user.role === "teacher" && (
                <div>
                  <h4>Students:</h4>
                  <ul>
                    {classroom.students.map((student) => (
                      <li key={student.id}>{student.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No classrooms found.</p>
        )}
      </div>
    </div>
  );
};

export default Classroom;
