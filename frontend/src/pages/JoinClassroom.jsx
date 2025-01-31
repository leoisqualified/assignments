import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinClassroom } from "../redux/classroomSlice";

const joinClassroom = () => {
  const [classroomId, setClassroomId] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.classroom);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(joinClassroom(classroomId));
    setClassroomId(""); // Clear input after submission
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Join a Classroom</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Classroom ID"
          className="w-full p-2 border rounded mb-2"
          value={classroomId}
          onChange={(e) => setClassroomId(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Joining..." : "Join Classroom"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default joinClassroom;
