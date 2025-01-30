import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // Simulating login response
    const fakeUser = { id: "123", name: "John Doe", role: "teacher" };

    dispatch(loginSuccess(fakeUser));
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default Login;
