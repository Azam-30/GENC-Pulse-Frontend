import api from "../api/axiosConfig";

export const loginUser =
  async (credentials) => {

    const response =
      await api.post(
        "/api/auth/login",
        credentials
      );

    return response.data;
  };