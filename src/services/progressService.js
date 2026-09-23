import api from "../api/axiosConfig";

export const getAllProgress = async () => {
  const response = await api.get(
    "/api/progress"
  );

  return response.data;
};

export const getProgressByEmployeeId =
  async (employeeId) => {

    const response = await api.get(
      `/api/progress/employee/${employeeId}`
    );

    return response.data;
  };

export const createProgress =
  async (progress) => {

    const response = await api.post(
      "/api/progress",
      progress
    );

    return response.data;
  };

export const getProgressByManagerId =
  async (managerId) => {

    const response = await api.get(
      `/api/progress/manager/${managerId}`
    );

    return response.data;
  };