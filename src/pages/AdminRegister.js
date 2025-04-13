import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    https://status-page-back-end.onrender.com/api
    http://localhost:5000/api/admin/register
    try {
      const response = await axios.post("https://status-page-back-end.onrender.com/api/admin/register", { email, password });
      console.log("Registration successful:", response.data);
      // After successful registration, redirect to login page (or you might auto-login)
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      setError(err.response?.data.message || "Registration failed");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-box">
        <h2>Admin Register</h2>
        <form onSubmit={handleRegister}>
            <div>
              <label>Email: </label>
              <input
                type="email"
                placeholder="admin@service.admin.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Confirm Password: </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Register</button>
          </form>
          <p>
            Already registered? <a href="/login">Go to Login</a>
          </p>
      </div>
    </div>

   
  );
};

export default AdminRegister;
