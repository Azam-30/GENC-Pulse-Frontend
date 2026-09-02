import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeModal from "../components/EmployeeModal";
import DeleteModal from "../components/DeleteModal";
import ViewEmployeeModal from "../components/ViewEmployeeModal";
import LoadingSpinner from "../components/LoadingSpinner";

import {
  getEmployees,
  getManagers,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [managerList, setManagerList] =
  useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");

  const role =
  localStorage.getItem("role");

  const [editingId, setEditingId] = useState(null);

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  const [form, setForm] = useState({
    employeeCode: "",
    name: "",
    email: "",
    username: "",

password: "",
    designation: "",
    technology: "",
    batch: "",
    location: "",
    role: "EMPLOYEE",
    managerId: "",
managerName: "",
    projectName: "",
    active: true,
  });

  useEffect(() => {
  loadEmployees();
  loadManagers();
}, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const response =
        await getEmployees();

      setEmployees(response.data || []);
    } catch {
      toast.error(
        "Unable to load employees"
      );
    } finally {
      setLoading(false);
    }
  };
  const loadManagers = async () => {
  try {

    const response =
      await getManagers();

    setManagerList(
      response.data || []
    );

  } catch {

    toast.error(
      "Unable to load managers"
    );

  }
};

  const totalEmployees =
    employees.length;

  const activeEmployees =
    employees.filter(
      (emp) => emp.active
    ).length;

  const inactiveEmployees =
    employees.filter(
      (emp) => !emp.active
    ).length;

const managerCount =
  employees.filter(
    (emp) =>
      emp.role?.toUpperCase() ===
      "MANAGER"
  ).length;

  const resetForm = () => {
    setEditingId(null);

    setForm({
      employeeCode: "",
      name: "",
      email: "",
      username: "",

password: "",
      designation: "",
      technology: "",
      batch: "",
      location: "",
      role: "EMPLOYEE",
      managerId: "",
managerName: "",
      projectName: "",
      active: true,
    });
  };

const handleInputChange = (e) => {

  let value = e.target.value;

  if (e.target.name === "active") {
    value = value === "true";
  }

  if (e.target.name === "managerId") {
    value = value
      ? Number(value)
      : null;
  }

  setForm({
    ...form,
    [e.target.name]: value,
  });

};


  const handleView = (employee) => {
    setSelectedEmployee(employee);
  };

const handleEdit = (employee) => {
  setSelectedEmployee(employee);

  setEditingId(employee.id);

  setForm({
    employeeCode:
      employee.employeeCode || "",

    name:
      employee.name || "",

    email:
      employee.email || "",

    username:
      employee.username || "",

    password: "",

    designation:
      employee.designation || "",

    technology:
      employee.technology || "",

    batch:
      employee.batch || "",

    location:
      employee.location || "",

    role:
      employee.role || "EMPLOYEE",

    managerId:
  employee.managerId || "",

managerName:
  employee.managerName || "",

    projectName:
      employee.projectName || "",

    active:
      employee.active ?? true,
  });
};

  const openDeleteModal = (
    employee
  ) => {
    setSelectedEmployee(employee);
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (editingId) {
        await updateEmployee(
          editingId,
          form
        );

        toast.success(
          "Employee updated successfully"
        );
      } else {
        await createEmployee(form);

        toast.success(
          "Employee created successfully"
        );
      }

      resetForm();

      await loadEmployees();

      await loadManagers();

      const modal =
        document.getElementById(
          "employeeModal"
        );

      if (modal) {
        modal.classList.remove(
          "show"
        );
        modal.style.display =
          "none";

        document
          .querySelectorAll(
            ".modal-backdrop"
          )
          .forEach((b) =>
            b.remove()
          );
      }
    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Operation failed"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (
    id
  ) => {
    try {
      setDeleting(true);

      await deleteEmployee(id);

      toast.success(
        "Employee deleted successfully"
      );

      await loadEmployees();

      document
        .querySelectorAll(
          ".modal-backdrop"
        )
        .forEach((b) =>
          b.remove()
        );
    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Unable to delete employee"
      );
    } finally {
      setDeleting(false);
    }
  };

  const toggleStatus =
    async (employee) => {
      try {
        await updateEmployee(
          employee.id,
          {
            ...employee,
            active:
              !employee.active,
          }
        );

        toast.success(
          employee.active
            ? "Employee deactivated"
            : "Employee activated"
        );

        loadEmployees();
      } catch {
        toast.error(
          "Status update failed"
        );
      }
    };

  const filteredEmployees =
    employees.filter(
      (employee) => {
        const searchText =
          search.toLowerCase();

        return (
          employee.employeeCode
            ?.toLowerCase()
            .includes(searchText) ||
          employee.name
            ?.toLowerCase()
            .includes(searchText) ||
          employee.email
            ?.toLowerCase()
            .includes(searchText) ||
          employee.projectName
            ?.toLowerCase()
            .includes(searchText)
        );
      }
    );

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          Employee Management
        </h2>

{role === "ADMIN" && (
  <button
    className="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#employeeModal"
    onClick={resetForm}
  >
    + Add Employee
  </button>
)}
      </div>

      {/* KPI CARDS */}

      <div className="stats-grid">
        <div className="stat-card blue">
          <h3>{totalEmployees}</h3>
          <p>Total Employees</p>
        </div>

        <div className="stat-card green">
          <h3>{activeEmployees}</h3>
          <p>Active Employees</p>
        </div>

        <div className="stat-card red">
          <h3>{inactiveEmployees}</h3>
          <p>Inactive Employees</p>
        </div>

        <div className="stat-card purple">
          <h3>{managerCount}</h3>

          <p>Managers</p>
        </div>
      </div>

      {/* DIRECTORY */}

      <div className="custom-card">

        <div className="directory-header">

          <h4 className="mb-0">
            Employee Directory
          </h4>

          <input
            type="text"
            className="form-control search-box"
            placeholder="Search employee..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <div className="mt-4">

          {loading ? (
            <LoadingSpinner />
          ) : (
            <EmployeeTable
              employees={
                filteredEmployees
              }
              role={role}
              onView={
                handleView
              }
              onEdit={
                handleEdit
              }
              onDeleteClick={
                openDeleteModal
              }
              onToggle={
                toggleStatus
              }
            />
          )}

        </div>

      </div>

{role === "ADMIN" && (
<EmployeeModal
  form={form}
  managers={managerList}
  handleInputChange={handleInputChange}
  handleSubmit={handleSubmit}
  editing={editingId}
  saving={saving}
/>
)}

      <ViewEmployeeModal
        employee={
          selectedEmployee
        }
      />

      {role === "ADMIN" && (<DeleteModal
        employee={
          selectedEmployee
        }
        confirmDelete={
          handleDelete
        }
        deleting={deleting}
      />)}
    </MainLayout>
  );
}

export default Employees;