import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Progress from "./pages/Progress";
import Commits from "./pages/Commits";
import Analytics from "./pages/Analytics";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <ToastContainer />

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "ADMIN",
              ]}
            >
              <Employees />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "ADMIN",
                "MANAGER",
                "EMPLOYEE",
              ]}
            >
              <Progress />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/commits"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "ADMIN",
                "MANAGER",
                "EMPLOYEE",
              ]}
            >
              <Commits />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "ADMIN",
                "MANAGER",
              ]}
            >
              <Analytics />
            </RoleProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;