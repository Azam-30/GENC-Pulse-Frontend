import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import ProgressModal from "../components/ProgressModal";

import {
  getAllProgress,
  getProgressByEmployeeId,
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

          <table className="table">

            <thead>

              <tr>

                {(role !==
                  "EMPLOYEE") && (
                  <th>
                    Employee Id
                  </th>
                )}

                <th>Story Id</th>

                <th>Task</th>

                <th>Hours</th>

                <th>Status</th>

                <th>Date</th>

              </tr>

            </thead>

            <tbody>

              {progressList.map(
                (item) => (

                <tr key={item.id}>

                  {(role !==
                    "EMPLOYEE") && (
                    <td>
                      {
                        item.employeeId
                      }
                    </td>
                  )}

                  <td>
                    {item.storyId}
                  </td>

                  <td>
                    {
                      item.taskDescription
                    }
                  </td>

                  <td>
                    {
                      item.hoursWorked
                    }
                  </td>

                  <td>
                    {item.status}
                  </td>

                  <td>
                    {
                      item.updateDate
                    }
                  </td>

                </tr>

              ))}
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