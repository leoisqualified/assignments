import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Classroom from "./pages/Classroom";
import CreateClassroom from "./pages/CreateClassroom";
import JoinClassroom from "./pages/JoinClassroom";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/teacher"
          element={
            user?.role === "teacher" ? (
              <TeacherDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/student"
          element={
            user?.role === "student" ? (
              <StudentDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/classroom/:id"
          element={user ? <Classroom /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-classroom"
          element={
            user?.role === "teacher" ? (
              <CreateClassroom />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/join-classroom"
          element={
            user?.role === "student" ? (
              <JoinClassroom />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
