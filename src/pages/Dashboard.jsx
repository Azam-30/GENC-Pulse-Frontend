import Navbar from
"../components/Navbar";

function Dashboard() {

  return (

    <div className="app-layout">

      <Navbar />

      <div className="content">

        <h2>
          Dashboard
        </h2>

        <div className="cards">

          <div className="stat-card">
            Employees
          </div>

          <div className="stat-card">
            Progress
          </div>

          <div className="stat-card">
            Commits
          </div>

          <div className="stat-card">
            Analytics
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;