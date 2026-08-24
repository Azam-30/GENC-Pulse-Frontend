import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaUsers,
  FaTasks,
  FaCodeBranch,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (

    <div className="sidebar">

      <h3 className="logo">
        GenC Pulse
      </h3>

      <Link to="/dashboard">
        Dashboard
      </Link>

      <Link to="/employees">
        <FaUsers />
        Employees
      </Link>

      <Link to="/progress">
        <FaTasks />
        Progress
      </Link>

      <Link to="/commits">
        <FaCodeBranch />
        Commits
      </Link>

      <Link to="/analytics">
        <FaChartBar />
        Analytics
      </Link>

      <button
        className="logout-btn"
        onClick={logout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}

export default Navbar;