import React, { useState, useEffect } from "react";
import { getClassroomAssignments, submitAssignment } from "../services/api";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const { data } = await getClassroomAssignments("classroomId");
      setAssignments(data);
    };
    fetchAssignments();
  }, []);

  const handleUpload = async (assignmentId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      await submitAssignment(assignmentId, formData);
      alert("Assignment submitted successfully!");
    } catch (error) {
      alert("Submission failed!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>
      {assignments.map((assignment) => (
        <div key={assignment._id} className="border p-4 mb-4 rounded">
          <h2 className="font-bold">{assignment.title}</h2>
          <p>{assignment.description}</p>
          <input
            type="file"
            onChange={(e) => handleUpload(assignment._id, e.target.files[0])}
            className="mt-2"
          />
        </div>
      ))}
    </div>
  );
};

export default Assignments;
