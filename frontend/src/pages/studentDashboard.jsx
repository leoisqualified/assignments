import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinClassroom, fetchClassrooms } from "../redux/classroomSlice";
import { useEffect } from "react";

const StudentDashboard = () => {
  const [classroomId, setClassroomId] = useState("");
  const dispatch = useDispatch();
  const { classrooms, loading } = useSelector((state) => state.classroom);

  useEffect(() => {
    dispatch(fetchClassrooms());
  }, [dispatch]);

  const handleJoinClassroom = () => {
    if (classroomId.trim()) {
      dispatch(joinClassroom(classroomId));
      setClassroomId("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      {/* Join Classroom Form */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter classroom ID"
          value={classroomId}
          onChange={(e) => setClassroomId(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleJoinClassroom}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
        >
          Join Classroom
        </button>
      </div>

      {/* Classroom List */}
      <h2 className="text-xl font-bold mt-6">Your Classrooms</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-2">
          {classrooms.map((classroom) => (
            <li key={classroom._id} className="border p-2 rounded mt-2">
              {classroom.name} (ID: {classroom._id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentDashboard;
