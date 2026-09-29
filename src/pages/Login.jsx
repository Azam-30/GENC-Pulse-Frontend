import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(email, password);
      const { token, id, name, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
      localStorage.setItem('userName', name);
      localStorage.setItem('role', role);

      if (role === 'EMPLOYEE') {
        navigate('/employee-dashboard');
      } else if (role === 'MANAGER') {
        navigate('/manager-dashboard');
      } else if (role === 'ADMIN') {
        navigate('/admin-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>GENC Pulse</h1>
        <p className="subtitle">Daily Status & Commit Tracking System</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Employee: emp@genc.com / password</p>
          <p>Manager: mgr@genc.com / password</p>
          <p>Admin: admin@genc.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
