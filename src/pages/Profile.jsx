import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  getEmployeeById
} from "../services/employeeService";

function Profile() {
  const [employee, setEmployee] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

const employeeId =
  localStorage.getItem(
    "employeeId"
  );

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

const response =
  await getEmployeeById(
    employeeId
  );

setEmployee(
  response.data
);

    } catch {
      toast.error(
        "Unable to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <h2 className="mb-4">
        My Profile
      </h2>

      {loading ? (
        <LoadingSpinner />
      ) : !employee ? (
        <div className="alert alert-warning">
          Employee profile not found.
        </div>
      ) : (
        <div className="custom-card">

          <div className="row">

            <div className="col-md-6">

              <p>
                <strong>
                  Employee Code:
                </strong>{" "}
                {employee.employeeCode}
              </p>

              <p>
                <strong>
                  Name:
                </strong>{" "}
                {employee.name}
              </p>

              <p>
                <strong>
                  Email:
                </strong>{" "}
                {employee.email}
              </p>

              <p>
                <strong>
                  Username:
                </strong>{" "}
                {employee.username}
              </p>

              <p>
                <strong>
                  Designation:
                </strong>{" "}
                {employee.designation ||
                  "-"}
              </p>

              <p>
                <strong>
                  Access Role:
                </strong>{" "}
                {employee.role}
              </p>

            </div>

            <div className="col-md-6">

              <p>
                <strong>
                  Technology:
                </strong>{" "}
                {employee.technology ||
                  "-"}
              </p>

              <p>
                <strong>
                  Location:
                </strong>{" "}
                {employee.location ||
                  "-"}
              </p>

              <p>
                <strong>
                  Batch:
                </strong>{" "}
                {employee.batch || "-"}
              </p>

              <p>
                <strong>
                  Reporting Manager:
                </strong>{" "}
                {employee.managerName ||
                  "-"}
              </p>

              <p>
                <strong>
                  Project:
                </strong>{" "}
                {employee.projectName ||
                  "-"}
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {employee.active
                  ? "Active"
                  : "Inactive"}
              </p>

            </div>

          </div>

        </div>
      )}

    </MainLayout>
  );
}

export default Profile;