function ProgressModal({
  form,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <div
      className="modal fade"
      id="progressModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <form onSubmit={handleSubmit}>

            <div className="modal-header">
              <h5 className="modal-title">
                Add Progress
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">

              <input
                className="form-control mb-3"
                placeholder="Story Id"
                name="storyId"
                value={form.storyId}
                onChange={handleInputChange}
                required
              />

              <textarea
                className="form-control mb-3"
                placeholder="Task Description"
                name="taskDescription"
                value={form.taskDescription}
                onChange={handleInputChange}
                required
              />

              <input
                type="number"
                className="form-control mb-3"
                placeholder="Hours Worked"
                name="hoursWorked"
                value={form.hoursWorked}
                onChange={handleInputChange}
                required
              />

              <select
                className="form-control mb-3"
                name="status"
                value={form.status}
                onChange={handleInputChange}
              >
                <option value="NOT_STARTED">
                  NOT_STARTED
                </option>

                <option value="IN_PROGRESS">
                  IN_PROGRESS
                </option>

                <option value="COMPLETED">
                  COMPLETED
                </option>
              </select>

              <textarea
                className="form-control mb-3"
                placeholder="Blockers"
                name="blockers"
                value={form.blockers}
                onChange={handleInputChange}
              />

              <input
                type="date"
                className="form-control"
                name="updateDate"
                value={form.updateDate}
                onChange={handleInputChange}
                required
              />

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default ProgressModal;