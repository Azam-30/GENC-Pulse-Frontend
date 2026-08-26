import {
  FaEye,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

function EmployeeTable({
  employees,
  role,
  onView,
  onEdit,
  onDeleteClick,
  onToggle,
}) {
  return (
    <div className="table-responsive">
      <table className="table employee-table align-middle">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Technology</th>
            <th>Project</th>
            <th>Status</th>
            <th width="220">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.employeeCode}</td>

                <td>
                  <div>
                    <strong>{employee.name}</strong>
                    <br />
                    <small>{employee.email}</small>
                  </div>
                </td>

                <td>
                  {employee.designation || "-"}
                </td>

                <td>
                  {employee.technology || "-"}
                </td>

                <td>
                  {employee.projectName || "-"}
                </td>

                <td>
                  <span
                    className={
                      employee.active
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {employee.active
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

<td>
  <div className="action-buttons">

    <button
      className="icon-btn view-btn"
      data-bs-toggle="modal"
      data-bs-target="#viewEmployeeModal"
      onClick={() => onView(employee)}
    >
      <FaEye />
    </button>

    {role === "ADMIN" && (
      <>
        <button
          className="icon-btn edit-btn"
          data-bs-toggle="modal"
          data-bs-target="#employeeModal"
          onClick={() => onEdit(employee)}
        >
          <FaEdit />
        </button>

        <button
          className="icon-btn status-btn"
          onClick={() => onToggle(employee)}
        >
          {employee.active
            ? <FaToggleOn />
            : <FaToggleOff />
          }
        </button>

        <button
          className="icon-btn delete-btn"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          onClick={() =>
            onDeleteClick(employee)
          }
        >
          <FaTrash />
        </button>
      </>
    )}

  </div>
</td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;