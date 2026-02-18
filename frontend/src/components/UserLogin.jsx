import "../styles/auth-shared.css";
import "./UserLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log("Login data:", data);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        data,
        { withCredentials: true },
      );
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
    navigate("/");
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-back-link" onClick={() => navigate("/")}>
          ← Back to Home
        </div>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login as a user</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <span
            className="auth-link"
            onClick={() => navigate("/user/register")}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
}
