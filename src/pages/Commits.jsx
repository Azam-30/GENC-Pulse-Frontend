import { useEffect, useState }
from "react";

import { toast }
from "react-toastify";

import MainLayout
from "../layouts/MainLayout";

import LoadingSpinner
from "../components/LoadingSpinner";

import {
  getAllCommits,
  getCommitsByEmployeeId,
  getCommitsByManagerId,
} from "../services/commitService";

export default function Commits() {

  const role =
    localStorage.getItem(
      "role"
    );

  const employeeId =
    localStorage.getItem(
      "employeeId"
    );

  const [loading,
    setLoading] =
    useState(false);

  const [commits,
    setCommits] =
    useState([]);

  useEffect(() => {

    loadCommits();

  }, []);

  const loadCommits =
    async () => {

      try {

        setLoading(true);

        let response;

        if (
          role === "EMPLOYEE"
        ) {

          response =
            await getCommitsByEmployeeId(
              employeeId
            );

        } else if (
          role === "MANAGER"
        ) {

          response =
            await getCommitsByManagerId(
              employeeId
            );

        } else {

          response =
            await getAllCommits();

        }

        setCommits(
          response || []
        );

      } catch {

        toast.error(
          "Unable to load commits"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <MainLayout>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>

          {role === "EMPLOYEE"
            ? "My Commits"
            : role === "MANAGER"
            ? "Team Commits"
            : "All Commits"}

        </h2>

      </div>

      <div className="custom-card">

        {loading ? (

          <LoadingSpinner />

        ) : (

<table className="table table-hover align-middle">
  <thead>
    <tr>
      {role !== "EMPLOYEE" && <th>Employee</th>}
      <th>Repository</th>
      <th>Branch</th>
      <th>Commit Details</th>
      <th>Commit Hash</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    {commits.length === 0 ? (
      <tr>
        <td
          colSpan={role !== "EMPLOYEE" ? 6 : 5}
          className="text-center py-4"
        >
          No commits found
        </td>
      </tr>
    ) : (
      commits.map((commit) => (
        <tr key={commit.id}>
          {role !== "EMPLOYEE" && (
            <td>
              <div>
                <strong>{commit.employeeName || "-"}</strong>
                <br />
                <small className="text-muted">
                  {commit.employeeCode || "-"}
                </small>
              </div>
            </td>
          )}
          <td>
            <strong>{commit.repositoryName}</strong>
          </td>
          <td>
            <span className="badge bg-secondary">
              {commit.branchName}
            </span>
          </td>
          <td>
            <div>
              <strong>{commit.commitMessage}</strong>
              {commit.commitLink && (
                <>
                  <br />
                  <a
                    href={commit.commitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Commit
                  </a>
                </>
              )}
            </div>
          </td>
          <td>
            <code>{commit.commitHash?.substring(0, 10)}</code>
          </td>
          <td>{commit.commitDate}</td>
        </tr>
      ))
    )}
  </tbody>
</table>

        )}

      </div>

    </MainLayout>

  );

}