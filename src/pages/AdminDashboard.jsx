import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeAPI } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formData, setFormData] = useState({ email: '', name: '', password: '', role: 'EMPLOYEE' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await employeeAPI.getAllManagers();
      setManagers(response.data || []);
    } catch (err) {
      console.error('Error loading managers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await employeeAPI.register(formData.email, formData.name, formData.password, formData.role);
      setMessage('✓ Employee registered successfully!');
      setFormData({ email: '', name: '', password: '', role: 'EMPLOYEE' });
      setShowRegisterForm(false);
      loadData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('✗ Error: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span>{userName}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="admin-section">
          <div className="section-header">
            <h2>User Management</h2>
            <button
              onClick={() => setShowRegisterForm(!showRegisterForm)}
              className="toggle-btn"
            >
              {showRegisterForm ? 'Cancel' : 'Register New User'}
            </button>
          </div>

          {showRegisterForm && (
            <div className="register-form-container">
              <form onSubmit={handleRegisterEmployee} className="register-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="employee@genc.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full Name"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Secure Password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="EMPLOYEE">Employee</option>
                      <option value="MANAGER">Manager</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? 'Registering...' : 'Register User'}
                </button>
                {message && (
                  <div className={`message ${message.includes('✓') ? 'success' : 'error'}`}>
                    {message}
                  </div>
                )}
              </form>
            </div>
          )}
        </section>

        <section className="admin-section">
          <h2>Managers & Team Leaders</h2>
          {loading ? (
            <p>Loading...</p>
          ) : managers.length > 0 ? (
            <div className="managers-grid">
              {managers.map((manager) => (
                <div key={manager.id} className="manager-card">
                  <div className="manager-header">
                    <h3>{manager.name}</h3>
                    <span className="role-badge manager">Manager</span>
                  </div>
                  <div className="manager-details">
                    <p><strong>Email:</strong> {manager.email}</p>
                    <p><strong>Status:</strong> {manager.active ? '✓ Active' : '✗ Inactive'}</p>
                    <p><strong>Created:</strong> {new Date(manager.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No managers found</p>
          )}
        </section>

        <section className="admin-section">
          <h2>System Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Total Users</h3>
              <p className="info-value">Multiple</p>
            </div>
            <div className="info-card">
              <h3>Managers</h3>
              <p className="info-value">{managers.length}</p>
            </div>
            <div className="info-card">
              <h3>Daily Submissions</h3>
              <p className="info-value">Real-time</p>
            </div>
            <div className="info-card">
              <h3>System Status</h3>
              <p className="info-value status-operational">✓ Operational</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
