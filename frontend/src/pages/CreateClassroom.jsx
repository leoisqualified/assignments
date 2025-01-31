import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClassroom } from "../redux/classroomSlice";

const createClassroom = () => {
  const [className, setClassName] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.classroom);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createClassroom({ name: className }));
    setClassName(""); // Clear input after submission
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Create a Classroom</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Classroom Name"
          className="w-full p-2 border rounded mb-2"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Classroom"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default createClassroom;
