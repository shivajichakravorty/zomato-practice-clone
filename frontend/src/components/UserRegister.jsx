import "../styles/auth-shared.css";
import "./UserRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        data,
        { withCredentials: true },
      );
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
    navigate("/");
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-back-link" onClick={() => navigate("/")}>
          ← Back to Home
        </div>
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Register as a user</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="auth-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/user/login")}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
