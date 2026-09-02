import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaUsers,
  FaTasks,
  FaCodeBranch,
  FaChartPie,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
function Sidebar() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const role =
    localStorage.getItem(
      "role"
    );

  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  const active = (path) =>
    location.pathname === path
      ? "active-link"
      : "";

  return (

    <div className="sidebar">

      <h2>GenC Pulse</h2>

      <Link
        to="/dashboard"
        className={active(
          "/dashboard"
        )}
      >

        <FaHome />
        Dashboard
      </Link>

      <Link
  to="/profile"
  className={active("/profile")}
>
  <FaUserCircle />
  My Profile
</Link>

      {role === "ADMIN" && (
        <Link
          to="/employees"
          className={active(
            "/employees"
          )}
        >
          <FaUsers />
          Employees
        </Link>
      )}

      <Link
        to="/progress"
        className={active(
          "/progress"
        )}
      >
        <FaTasks />

        {role === "EMPLOYEE"
          ? "My Progress"
          : "Progress"}
      </Link>

      <Link
        to="/commits"
        className={active(
          "/commits"
        )}
      >
        <FaCodeBranch />

        {role === "EMPLOYEE"
          ? "My Commits"
          : "Commits"}
      </Link>

      {(role === "ADMIN" ||
        role === "MANAGER") && (

        <Link
          to="/analytics"
          className={active(
            "/analytics"
          )}
        >
          <FaChartPie />
          Analytics
        </Link>

      )}

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

export default Sidebar;