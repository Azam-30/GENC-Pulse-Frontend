function ViewEmployeeModal({
  employee,
}) {
  if (!employee) return null;

  return (
    <div
      className="modal fade"
      id="viewEmployeeModal"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              Employee Details
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body">

            <div className="row">

              <div className="col-md-6">

                <p>
                  <strong>Employee Code:</strong>
                  {" "}
                  {employee.employeeCode}
                </p>

                <p>
                  <strong>Name:</strong>
                  {" "}
                  {employee.name}
                </p>

                <p>
                  <strong>Email:</strong>
                  {" "}
                  {employee.email}
                </p>

                <p>
  <strong>Username:</strong>{" "}
  {employee.username}
</p>

                <p>
                  <strong>Designation:</strong>
                  {" "}
                  {employee.designation || "-"}
                </p>

                <p>
                  <strong>Access Role:</strong>
                  {" "}
                  {employee.role}
                </p>

              </div>

              <div className="col-md-6">

                <p>
                  <strong>Technology:</strong>
                  {" "}
                  {employee.technology || "-"}
                </p>

                <p>
                  <strong>Location:</strong>
                  {" "}
                  {employee.location || "-"}
                </p>

                <p>
                  <strong>Batch:</strong>
                  {" "}
                  {employee.batch || "-"}
                </p>

                <p>
                  <strong>Status:</strong>
                  {" "}
                  {employee.active
                    ? "Active"
                    : "Inactive"}
                </p>

              </div>

            </div>

            <hr />

<p>
  <strong>Manager ID:</strong>{" "}
  {employee.managerId || "-"}
</p>

<p>
  <strong>Manager Name:</strong>{" "}
  {employee.managerName || "-"}
</p>

            <p>
              <strong>Project Name:</strong>
              {" "}
              {employee.projectName || "-"}
            </p>

            <p>
              <strong>Created:</strong>
              {" "}
              {employee.createdAt || "-"}
            </p>

            <p>
              <strong>Last Updated:</strong>
              {" "}
              {employee.updatedAt || "-"}
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewEmployeeModal;