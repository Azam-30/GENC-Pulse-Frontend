import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  register: (email, name, password, role) =>
    api.post('/employees/register', { email, name, password, role }),
  validateToken: () =>
    api.post('/auth/validate', {}),
};

export const employeeAPI = {
  getProfile: (id) =>
    api.get(`/employees/me/${id}`),
  getTeam: (managerId) =>
    api.get(`/employees/team/${managerId}`),
  linkGitHub: (employeeId, githubUsername, githubToken) =>
    api.post(`/employees/${employeeId}/github`, {
      githubUsername,
      githubToken,
    }),
  getAllManagers: () =>
    api.get('/employees/managers/all'),
};

export const statusAPI = {
  submitStatus: (employeeId, statusDescription) => {
    const config = {
      headers: {
        'X-Employee-Id': employeeId,
      },
    };
    return api.post('/status/submit', { statusDescription }, config);
  },
  getTodayStatus: (employeeId) => {
    const config = {
      headers: {
        'X-Employee-Id': employeeId,
      },
    };
    return api.get('/status/today', config);
  },
  getHistory: (employeeId) => {
    const config = {
      headers: {
        'X-Employee-Id': employeeId,
      },
    };
    return api.get('/status/history', config);
  },
  getPendingStatuses: (date) =>
    api.get(`/status/pending/${date}`),
};

export const commitAPI = {
  syncCommits: (employeeId, githubUsername, githubToken) => {
    const config = {
      headers: {
        'X-Employee-Id': employeeId,
      },
    };
    return api.post('/commits/sync', { githubUsername, githubToken }, config);
  },
  getCommitsByDate: (employeeId, date) =>
    api.get(`/commits/employee/${employeeId}/date/${date}`),
  getCommitsByRepository: (employeeId, repo) =>
    api.get(`/commits/employee/${employeeId}/repo/${repo}`),
};

export const notificationAPI = {
  getEmployeeNotifications: (employeeId) =>
    api.get(`/notifications/employee/${employeeId}`),
  getManagerNotifications: (managerId) =>
    api.get(`/notifications/manager/${managerId}`),
  acknowledgeNotification: (notificationId) =>
    api.put(`/notifications/${notificationId}/acknowledge`, {}),
};

export const dashboardAPI = {
  getManagerDashboard: (managerId, teamMembers) => {
    const params = teamMembers ? { teamMembers: teamMembers.join(',') } : {};
    return api.get(`/dashboard/manager/${managerId}`, { params });
  },
  getEmployeeDashboard: (employeeId) =>
    api.get(`/dashboard/employee/${employeeId}`),
};

export default api;
