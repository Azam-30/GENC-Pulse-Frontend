import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  getEmployees,
  getEmployeesByManagerId,
} from "../services/employeeService";

function Dashboard() {

  const role =
    localStorage.getItem("role");

  const [employees, setEmployees] =
    useState([]);

  const [teamMembers, setTeamMembers] =
    useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const employeeId =
        localStorage.getItem(
          "employeeId"
        );

      if (role === "ADMIN") {

        const response =
          await getEmployees();

        setEmployees(
          response.data || []
        );
      }

      if (role === "MANAGER") {

        const response =
          await getEmployeesByManagerId(
            employeeId
          );

        setTeamMembers(
          response.data || []
        );
      }

    } catch (error) {

      console.error(
        "Dashboard Load Error",
        error
      );
    }
  };

  const totalEmployees =
    employees.length;

  const managerCount =
    employees.filter(
      (employee) =>
        employee.role?.toUpperCase() ===
        "MANAGER"
    ).length;

  const activeEmployees =
    employees.filter(
      (employee) => employee.active
    ).length;

  return (
    <MainLayout>

      <h1 className="mb-4">
        Dashboard
      </h1>

      {/* ADMIN */}

      {role === "ADMIN" && (
        <>
          <div className="stats-grid">

            <div className="stat-card blue">
              <h3>
                {totalEmployees}
              </h3>
              <p>
                Total Employees
              </p>
            </div>

            <div className="stat-card green">
              <h3>
                {managerCount}
              </h3>
              <p>
                Managers
              </p>
            </div>

            <div className="stat-card red">
              <h3>
                {activeEmployees}
              </h3>
              <p>
                Active Employees
              </p>
            </div>

            <div className="stat-card purple">
              <h3>
                {totalEmployees -
                  activeEmployees}
              </h3>
              <p>
                Inactive Employees
              </p>
            </div>

          </div>

          <div className="custom-card mt-4">

            <h4>
              Administrator Dashboard
            </h4>

            <p>
              Manage employees,
              manager hierarchy,
              project allocation,
              progress tracking,
              commits and analytics.
            </p>

          </div>
        </>
      )}

      {/* MANAGER */}

      {role === "MANAGER" && (
        <>
          <div className="stats-grid">

            <div className="stat-card blue">
              <h3>
                {teamMembers.length}
              </h3>

              <p>
                Team Members
              </p>
            </div>

            <div className="stat-card green">
              <h3>
                {
                  teamMembers.filter(
                    (member) =>
                      member.active
                  ).length
                }
              </h3>

              <p>
                Active Team Members
              </p>
            </div>

            <div className="stat-card purple">
              <h3>
                {
                  teamMembers.filter(
                    (member) =>
                      !member.active
                  ).length
                }
              </h3>

              <p>
                Inactive Team Members
              </p>
            </div>

          </div>

          <div className="custom-card mt-4">

            <h4>
              My Team
            </h4>

            {teamMembers.length === 0 ? (

              <p>
                No team members assigned.
              </p>

            ) : (

              <div className="table-responsive">

                <table className="table">

                  <thead>
                    <tr>
                      <th>
                        Employee Code
                      </th>
                      <th>
                        Name
                      </th>
                      <th>
                        Designation
                      </th>
                      <th>
                        Technology
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {teamMembers.map(
                      (member) => (
                        <tr
                          key={
                            member.id
                          }
                        >
                          <td>
                            {
                              member.employeeCode
                            }
                          </td>

                          <td>
                            {
                              member.name
                            }
                          </td>

                          <td>
                            {
                              member.designation ||
                              "-"
                            }
                          </td>

                          <td>
                            {
                              member.technology ||
                              "-"
                            }
                          </td>
                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>
        </>
      )}

      {/* EMPLOYEE */}

      {role === "EMPLOYEE" && (
        <>
          <div className="stats-grid">

            <div className="stat-card blue">
              <h3>
                Profile
              </h3>

              <p>
                View Personal
                Details
              </p>
            </div>

            <div className="stat-card green">
              <h3>
                Progress
              </h3>

              <p>
                Update Daily
                Progress
              </p>
            </div>

            <div className="stat-card purple">
              <h3>
                Commits
              </h3>

              <p>
                Track Your
                Contributions
              </p>
            </div>

          </div>

          <div className="custom-card mt-4">

            <h4>
              Employee Dashboard
            </h4>

            <p>
              Manage your
              progress updates,
              commits and profile
              information.
            </p>

          </div>
        </>
      )}

    </MainLayout>
  );
}

export default Dashboard;