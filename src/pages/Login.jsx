import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import {
  loginUser,
}
from "../services/authService";

function Login() {

  const navigate =
    useNavigate();

  const [username,
    setUsername]
    = useState("");

  const [password,
    setPassword]
    = useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

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

        navigate("/dashboard");

      } catch {

        alert("Login Failed");
      }
    };

  return (

    <div className="login-page">

      <div className="login-card">

        <h2>
          GenC Pulse
        </h2>

        <p>
          Employee Productivity Tracker
        </p>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <input
            type="text"
            placeholder="Username"
            className="form-control mb-3"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            className="btn btn-primary w-100"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;