import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import ProgressModal from "../components/ProgressModal";

import {
  getAllProgress,
  getProgressByEmployeeId,
  getProgressByManagerId,
  createProgress,
} from "../services/progressService";

export default function Progress() {

  const role =
    localStorage.getItem("role");

  const employeeId =
    localStorage.getItem(
      "employeeId"
    );

  const [loading, setLoading] =
    useState(false);

  const [progressList,
    setProgressList] =
    useState([]);

  const [form, setForm] =
    useState({
      employeeId,
      storyId: "",
      taskDescription: "",
      hoursWorked: "",
      status: "IN_PROGRESS",
      blockers: "",
      updateDate:
        new Date()
          .toISOString()
          .split("T")[0],
    });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {

    try {

      setLoading(true);

      let response;

if (role === "EMPLOYEE") {

  response =
    await getProgressByEmployeeId(
      employeeId
    );

} else if (
  role === "MANAGER" &&
  employeeId
) {

  response =
    await getProgressByManagerId(
      employeeId
    );

} else {

  response =
    await getAllProgress();

}

      setProgressList(response);

    } catch {

      toast.error(
        "Unable to load progress"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleInputChange =
    (e) => {

      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await createProgress(
          form
        );

        toast.success(
          "Progress Submitted"
        );

        loadProgress();

      } catch {

        toast.error(
          "Failed to submit progress"
        );

      }
    };

  return (
    <MainLayout>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>
          {role === "EMPLOYEE"
            ? "My Progress"
            : "Progress Tracking"}
        </h2>

        {role === "EMPLOYEE" && (
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#progressModal"
          >
            + Add Progress
          </button>
        )}

      </div>

      <div className="custom-card">

        {loading ? (
          <LoadingSpinner />
        ) : (

<table className="table table-hover align-middle">

  <thead>

    <tr>

      {role !== "EMPLOYEE" && (
        <th>Employee</th>
      )}

      <th>Task Details</th>

      <th>Hours</th>

      <th>Status</th>

      <th>Blockers</th>

      <th>Date</th>

    </tr>

  </thead>

  <tbody>

    {progressList.length === 0 ? (

      <tr>
        <td
          colSpan={
            role !== "EMPLOYEE"
              ? 6
              : 5
          }
          className="text-center py-4"
        >
          No progress records found
        </td>
      </tr>

    ) : (

      progressList.map((item) => (

        <tr key={item.id}>

          {role !== "EMPLOYEE" && (

            <td>

              <div>

                <strong>
                  {item.employeeName || "-"}
                </strong>

                <br />

                <small className="text-muted">
                  {item.employeeCode || "-"}
                </small>

              </div>

            </td>

          )}

          <td>

            <div>

              <strong>
                {item.taskDescription}
              </strong>

              <br />

              <small className="text-muted">

                Story ID:
                {" "}
                {item.storyId || "-"}

              </small>

            </div>

          </td>

          <td>

            <span className="fw-semibold">
              {item.hoursWorked}
            </span>

          </td>

          <td>

            <span
              className={
                item.status === "COMPLETED"
                  ? "badge bg-success"
                  : item.status === "BLOCKED"
                  ? "badge bg-danger"
                  : "badge bg-warning text-dark"
              }
            >

              {item.status
                ?.replaceAll(
                  "_",
                  " "
                )}

            </span>

          </td>

          <td>

            {item.blockers &&
            item.blockers !== "None" &&
            item.blockers !== "nothing" ? (

              <span className="text-danger fw-semibold">
                {item.blockers}
              </span>

            ) : (

              <span className="text-success">
                No Blockers
              </span>

            )}

          </td>

          <td>

            {item.updateDate}

          </td>

        </tr>

      ))

    )}

  </tbody>

</table>

        )}

      </div>

      {role === "EMPLOYEE" && (
        <ProgressModal
          form={form}
          handleInputChange={
            handleInputChange
          }
          handleSubmit={
            handleSubmit
          }
        />
      )}

    </MainLayout>
  );
}