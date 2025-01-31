import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClassroom, fetchClassrooms } from "../redux/classroomSlice";
import { useEffect } from "react";

const TeacherDashboard = () => {
  const [classroomName, setClassroomName] = useState("");
  const dispatch = useDispatch();
  const { classrooms, loading } = useSelector((state) => state.classroom);

  useEffect(() => {
    dispatch(fetchClassrooms());
  }, [dispatch]);

  const handleCreateClassroom = () => {
    if (classroomName.trim()) {
      dispatch(createClassroom({ name: classroomName }));
      setClassroomName("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Teacher Dashboard</h1>

      {/* Create Classroom Form */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter classroom name"
          value={classroomName}
          onChange={(e) => setClassroomName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleCreateClassroom}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Classroom
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

export default TeacherDashboard;
