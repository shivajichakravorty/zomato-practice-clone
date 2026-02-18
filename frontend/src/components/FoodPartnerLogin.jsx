import "../styles/auth-shared.css";
import "./FoodPartnerLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PartnerLogin() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log("Partner login data:", data);
    // Implement actual login logic here (e.g., API call)
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/login",
        data,
        { withCredentials: true },
      );
      console.log("Partner login successful:", response.data);
    } catch (error) {
      console.error("Partner login failed:", error);
    }
    navigate("/");
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-back-link" onClick={() => navigate("/")}>
          ← Back to Home
        </div>
        <h2 className="auth-title">Partner Login</h2>
        <p className="auth-subtitle">Access your dashboard</p>

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
          New partner?{" "}
          <span
            className="auth-link"
            onClick={() => navigate("/foodpartner/register")}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
}
