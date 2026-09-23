import api from "../api/axiosConfig";

export const getAllCommits =
  async () => {

    const response =
      await api.get(
        "/api/commits"
      );

    return response.data.data;
  };

export const getCommitsByEmployeeId =
  async (employeeId) => {

    const response =
      await api.get(
        `/api/commits/employee/${employeeId}`
      );

    return response.data.data;
  };

export const getCommitsByManagerId =
  async (managerId) => {

    const response =
      await api.get(
        `/api/commits/manager/${managerId}`
      );

    return response.data;
  };