function EmployeeModal({
  form,
  handleInputChange,
  handleSubmit,
  editing,
  saving,
}) {
  return (
    <div
      className="modal fade"
      id="employeeModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          <form onSubmit={handleSubmit}>

            <div className="modal-header">
              <h5 className="modal-title">
                {editing
                  ? "Update Employee"
                  : "Add Employee"}
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Employee Code
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="employeeCode"
                    value={form.employeeCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Employee Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Designation
                  </label>

                  <select
                    className="form-control"
                    name="designation"
                    value={form.designation}
                    onChange={handleInputChange}
                  >
                    <option value="">
                      Select Designation
                    </option>

                    <option value="PAT">
                      PAT
                    </option>

                    <option value="Programmer Analyst">
                      Programmer Analyst
                    </option>

                    <option value="Software Engineer">
                      Software Engineer
                    </option>

                    <option value="Senior Engineer">
                      Senior Engineer
                    </option>

                    <option value="Lead">
                      Lead
                    </option>

                    <option value="Manager">
                      Manager
                    </option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Access Role
                  </label>

                  <select
                    className="form-control"
                    name="role"
                    value={form.role}
                    onChange={handleInputChange}
                  >
                    <option value="EMPLOYEE">
                      EMPLOYEE
                    </option>

                    <option value="MANAGER">
                      MANAGER
                    </option>

                    <option value="ADMIN">
                      ADMIN
                    </option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Technology
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="technology"
                    value={form.technology}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Location
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={form.location}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Batch
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="batch"
                    value={form.batch}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Reporting Manager
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="managerName"
                    value={form.managerName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Project Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="projectName"
                    value={form.projectName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Status
                  </label>

                  <select
                    className="form-control"
                    name="active"
                    value={form.active}
                    onChange={handleInputChange}
                  >
                    <option value={true}>
                      Active
                    </option>

                    <option value={false}>
                      Inactive
                    </option>
                  </select>
                </div>

              </div>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editing
                  ? "Update Employee"
                  : "Add Employee"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default EmployeeModal;