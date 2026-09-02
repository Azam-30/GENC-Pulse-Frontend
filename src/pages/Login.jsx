import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await loginUser({
          username,
          password,
        });

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      localStorage.setItem(
        "username",
        response.data.username
      );

      localStorage.setItem(
  "employeeId",
  response.data.employeeId
);

      toast.success(
        "Login Successful"
      );

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2 className="text-center mb-3">
          GenC Pulse
        </h2>

        <p className="text-center text-muted mb-4">
          Employee Progress Tracking System
        </p>

        <form onSubmit={submit}>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              required
            />
          </div>

          <div className="mb-3 position-relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

            <button
              type="button"
              className="password-toggle-btn"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;