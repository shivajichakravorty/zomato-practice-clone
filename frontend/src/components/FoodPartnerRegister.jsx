import "../styles/auth-shared.css";
import "./FoodPartnerRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PartnerRegister() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle partner registration logic here
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("ownerName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log("Partner registration data:", data);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/register",
        data,
        { withCredentials: true },
      );
      console.log("Partner registration successful:", response.data);
    } catch (error) {
      console.error("Partner registration failed:", error);
    }
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-back-link" onClick={() => navigate("/")}>
          ← Back to Home
        </div>
        <h2 className="auth-title">Partner Registration</h2>
        <p className="auth-subtitle">Register as a food partner</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="ownerName"
            placeholder="Owner Name"
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
          Already registered?{" "}
          <span
            className="auth-link"
            onClick={() => navigate("/foodpartner/login")}
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
}
