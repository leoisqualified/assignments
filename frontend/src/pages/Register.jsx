import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password, role }));
  };

  if (user) {
    navigate(user.role === "teacher" ? "/teacher" : "/student");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-lg rounded-lg w-96"
      >
        <h2 className="text-xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-2"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border mb-2"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
