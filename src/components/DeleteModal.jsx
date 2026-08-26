function DeleteModal({
  employee,
  confirmDelete,
  deleting
}) {

  return (

    <div
      className="modal fade"
      id="deleteModal"
      tabIndex="-1"
    >

      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">

            <h5>
              Delete Employee
            </h5>

            <button
              className="btn-close"
              data-bs-dismiss="modal"
            />

          </div>

          <div className="modal-body">

            Are you sure you want to delete

            <strong>
              {" "}
              {employee?.name}
              {" "}
            </strong>

            ?

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={() =>
                confirmDelete(
                  employee?.id
                )
              }
              disabled={deleting}
            >

              {deleting
                ? "Deleting..."
                : "Delete"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;