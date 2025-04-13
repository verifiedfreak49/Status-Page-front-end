import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Component for handling admin login
const AdminLogin = () => {
  // State to store user inputs and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handles form submission for login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login credentials to backend API
      const response = await axios.post('https://status-page-back-end.onrender.com/api/login', { email, password });

      // If successful, set a localStorage flag and redirect to admin dashboard
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials and domain.');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-box">
        <h2>Admin Login</h2>

        {/* Login form */}
        <form onSubmit={handleLogin}>
          <div>
            <label>Email: </label>
            <input
              type="email"
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

          {/* Display error message if login fails */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit">Login</button>
        </form>

        {/* Link to register page */}
        <p>
          A new Admin? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
