import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { statusAPI, commitAPI, notificationAPI, dashboardAPI } from '../services/api';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const [statusDescription, setStatusDescription] = useState('');
  const [todayStatus, setTodayStatus] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadDashboard();
    loadNotifications();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await dashboardAPI.getEmployeeDashboard(userId);
      setDashboard(response.data);
      if (response.data.statusSubmitted) {
        setStatusDescription(response.data.description || '');
        setTodayStatus(response.data);
      }
    } catch (err) {
      console.error('Error loading dashboard:', err);
    }
  };

  const loadNotifications = async () => {
    try {
      const response = await notificationAPI.getEmployeeNotifications(userId);
      setNotifications(response.data || []);
    } catch (err) {
      console.error('Error loading notifications:', err);
    }
  };

  const handleSubmitStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await statusAPI.submitStatus(userId, statusDescription);
      setMessage('✓ Status submitted successfully!');
      setStatusDescription('');
      loadDashboard();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('✗ Error submitting status: ' + err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleAcknowledgeNotification = async (notificationId) => {
    try {
      await notificationAPI.acknowledgeNotification(notificationId);
      loadNotifications();
    } catch (err) {
      console.error('Error acknowledging notification:', err);
    }
  };

  return (
    <div className="employee-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Employee Dashboard</h1>
          <div className="user-info">
            <span>{userName}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-grid">
          {/* Status Submission Card */}
          <section className="dashboard-card status-card">
            <h2>Today's Status Update</h2>
            <form onSubmit={handleSubmitStatus}>
              <textarea
                value={statusDescription}
                onChange={(e) => setStatusDescription(e.target.value)}
                placeholder="Describe what you worked on today, tasks completed, and any blockers..."
                rows="6"
                required
              ></textarea>
              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? 'Submitting...' : 'Submit Status'}
              </button>
              {message && <div className={`message ${message.includes('✓') ? 'success' : 'error'}`}>{message}</div>}
            </form>
          </section>

          {/* Dashboard Stats */}
          <section className="dashboard-card stats-card">
            <h2>Today's Summary</h2>
            {dashboard ? (
              <div className="stats-grid">
                <div className="stat">
                  <label>Date</label>
                  <span className="stat-value">{dashboard.date}</span>
                </div>
                <div className="stat">
                  <label>Status Submitted</label>
                  <span className={`stat-value ${dashboard.statusSubmitted ? 'submitted' : 'pending'}`}>
                    {dashboard.statusSubmitted ? '✓ Yes' : '⏳ Pending'}
                  </span>
                </div>
                <div className="stat">
                  <label>Submission Consistency</label>
                  <span className="stat-value">{dashboard.consistencyRate}</span>
                </div>
                <div className="stat">
                  <label>Last 7 Days</label>
                  <span className="stat-value">{dashboard.lastSevenDays}/7</span>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </section>

          {/* Notifications */}
          <section className="dashboard-card notifications-card">
            <h2>Notifications ({notifications.length})</h2>
            {notifications.length > 0 ? (
              <div className="notifications-list">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`notification-item ${notif.notificationType}`}>
                    <div className="notif-content">
                      <p className="notif-message">{notif.notificationMessage}</p>
                      <small>{new Date(notif.sentAt).toLocaleString()}</small>
                    </div>
                    <button
                      onClick={() => handleAcknowledgeNotification(notif.id)}
                      className="acknowledge-btn"
                    >
                      Acknowledge
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-items">No notifications</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
