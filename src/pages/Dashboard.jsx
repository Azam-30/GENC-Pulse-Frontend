import MainLayout from "../layouts/MainLayout";

function Dashboard() {
  const role =
    localStorage.getItem("role");

  return (
    <MainLayout>

      <h1 className="mb-4">
        Dashboard
      </h1>

      {role === "ADMIN" && (
        <>
          <div className="stats-grid">

            <div className="stat-card blue">
              <h3>Employees</h3>
              <p>Total Employee Directory</p>
            </div>

            <div className="stat-card green">
              <h3>Managers</h3>
              <p>Manage Employee Access</p>
            </div>

            <div className="stat-card red">
              <h3>Progress</h3>
              <p>Track Employee Progress</p>
            </div>

            <div className="stat-card purple">
              <h3>Analytics</h3>
              <p>Organization Insights</p>
            </div>

          </div>

          <div className="custom-card mt-4">
            <h4>Administrator Dashboard</h4>

            <p>
              Manage employees, monitor projects,
              review commits, and access company
              analytics.
            </p>
          </div>
        </>
      )}

      {role === "MANAGER" && (
        <>
          <div className="stats-grid">

            <div className="stat-card blue">
              <h3>Team</h3>
              <p>Manage Team Activities</p>
            </div>

            <div className="stat-card green">
              <h3>Progress</h3>
              <p>Track Team Progress</p>
            </div>

            <div className="stat-card purple">
              <h3>Analytics</h3>
              <p>View Team Insights</p>
            </div>

          </div>

          <div className="custom-card mt-4">
            <h4>Manager Dashboard</h4>

            <p>
              Review your team's progress,
              commits, and performance trends.
            </p>
          </div>
        </>
      )}

      {role === "EMPLOYEE" && (
        <>
          <div className="stats-grid">

            <div className="stat-card blue">
              <h3>Profile</h3>
              <p>View Personal Details</p>
            </div>

            <div className="stat-card green">
              <h3>Progress</h3>
              <p>Update Daily Progress</p>
            </div>

            <div className="stat-card purple">
              <h3>Commits</h3>
              <p>Track Your Contributions</p>
            </div>

          </div>

          <div className="custom-card mt-4">
            <h4>Employee Dashboard</h4>

            <p>
              Manage your progress updates,
              commits and personal profile.
            </p>
          </div>
        </>
      )}

    </MainLayout>
  );
}

export default Dashboard;