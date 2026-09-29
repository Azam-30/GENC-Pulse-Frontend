import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeAPI, dashboardAPI, notificationAPI } from '../services/api';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const [team, setTeam] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    loadTeam();
    loadNotifications();
  }, []);

  useEffect(() => {
    if (team.length > 0) {
      loadDashboard();
    }
  }, [team]);

  const loadTeam = async () => {
    setLoading(true);
    try {
      const response = await employeeAPI.getTeam(userId);
      setTeam(response.data || []);
    } catch (err) {
      console.error('Error loading team:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadDashboard = async () => {
    try {
      const teamMembers = team.map((emp) => emp.id);
      const response = await dashboardAPI.getManagerDashboard(userId, teamMembers);
      setDashboard(response.data);
    } catch (err) {
      console.error('Error loading dashboard:', err);
    }
  };

  const loadNotifications = async () => {
    try {
      const response = await notificationAPI.getManagerNotifications(userId);
      setNotifications(response.data || []);
    } catch (err) {
      console.error('Error loading notifications:', err);
    }
  };

  const handleAcknowledgeNotification = async (notificationId) => {
    try {
      await notificationAPI.acknowledgeNotification(notificationId);
      loadNotifications();
    } catch (err) {
      console.error('Error acknowledging notification:', err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="manager-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Manager Dashboard</h1>
          <div className="user-info">
            <span>{userName}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Summary Cards */}
        <section className="summary-section">
          {dashboard && (
            <div className="summary-cards">
              <div className="summary-card">
                <h3>Team Members</h3>
                <p className="card-value">{dashboard.totalTeamMembers}</p>
              </div>
              <div className="summary-card submitted">
                <h3>Submitted Today</h3>
                <p className="card-value">{dashboard.submitted}</p>
              </div>
              <div className="summary-card pending">
                <h3>Pending</h3>
                <p className="card-value">{dashboard.pending}</p>
              </div>
              <div className="summary-card rate">
                <h3>Submission Rate</h3>
                <p className="card-value">{dashboard.submissionRate}</p>
              </div>
            </div>
          )}
        </section>

        <div className="dashboard-grid">
          {/* Team Status Table */}
          <section className="dashboard-card team-card">
            <h2>Team Status Overview</h2>
            {loading ? (
              <p>Loading team data...</p>
            ) : team.length > 0 ? (
              <div className="team-table-container">
                <table className="team-table">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Email</th>
                      <th>GitHub</th>
                      <th>Status Submitted</th>
                      <th>Last Submission</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.map((employee) => {
                      const teamStatus = dashboard?.teamStatus?.find(
                        (ts) => ts.employeeId === employee.id
                      );
                      return (
                        <tr key={employee.id}>
                          <td>{employee.name}</td>
                          <td>{employee.email}</td>
                          <td>{employee.githubUsername || 'Not linked'}</td>
                          <td>
                            <span className={`status ${teamStatus?.submitted ? 'submitted' : 'pending'}`}>
                              {teamStatus?.submitted ? '✓ Yes' : '⏳ No'}
                            </span>
                          </td>
                          <td>{teamStatus?.submittedAt || 'Never'}</td>
                          <td>
                            <button
                              onClick={() => setSelectedEmployee(employee)}
                              className="view-btn"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No team members assigned</p>
            )}
          </section>

          {/* Alerts & Notifications */}
          <section className="dashboard-card alerts-card">
            <h2>Alerts & Notifications ({notifications.length})</h2>
            {notifications.length > 0 ? (
              <div className="alerts-list">
                {notifications.map((alert) => (
                  <div key={alert.id} className={`alert-item ${alert.notificationType}`}>
                    <div className="alert-icon">⚠️</div>
                    <div className="alert-content">
                      <p className="alert-message">{alert.notificationMessage}</p>
                      <small>Day {alert.dayCount} • {new Date(alert.sentAt).toLocaleString()}</small>
                    </div>
                    <button
                      onClick={() => handleAcknowledgeNotification(alert.id)}
                      className="ack-btn"
                    >
                      Acknowledge
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-items">No alerts</p>
            )}
          </section>
        </div>

        {/* Employee Details Modal */}
        {selectedEmployee && (
          <div className="modal-overlay" onClick={() => setSelectedEmployee(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedEmployee(null)}>×</button>
              <h2>{selectedEmployee.name}</h2>
              <div className="employee-details">
                <p><strong>Email:</strong> {selectedEmployee.email}</p>
                <p><strong>Role:</strong> {selectedEmployee.role}</p>
                <p><strong>GitHub:</strong> {selectedEmployee.githubUsername || 'Not linked'}</p>
                <p><strong>Active:</strong> {selectedEmployee.active ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManagerDashboard;
