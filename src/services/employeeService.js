import api from "../api/axiosConfig";

export const getEmployees = async () => {
  const response = await api.get("/api/employees");
  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await api.get(
    `/api/employees/${id}`
  );

  return response.data;
};

export const createEmployee = async (
  employee
) => {

  const response = await api.post(
    "/api/employees",
    employee
  );

  return response.data;
};

export const updateEmployee = async (
  id,
  employee
) => {

  const response = await api.put(
    `/api/employees/${id}`,
    employee
  );

  return response.data;
};

export const deleteEmployee = async (
  id
) => {

  const response = await api.delete(
    `/api/employees/${id}`
  );

  return response.data;
};