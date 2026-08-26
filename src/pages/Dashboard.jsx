import MainLayout
from "../layouts/MainLayout";

function Dashboard() {

 return (

 <MainLayout>

  <h1>
   Dashboard
  </h1>

  <div className="cards">

   <div className="card-item">
    Employees
   </div>

   <div className="card-item">
    Progress
   </div>

   <div className="card-item">
    Commits
   </div>

   <div className="card-item">
    Analytics
   </div>

  </div>

 </MainLayout>
 );
}

export default Dashboard;