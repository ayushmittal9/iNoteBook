import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });
  
      const json = await response.json();
  
      console.log(json);
  
      if (response.ok && json.success) {
        const token = json.authtoken;
        if (token) {
          localStorage.setItem("token", token);
          console.log("Token saved:", token);
          navigate("/home");
        } else {
          console.error("Token is missing in the response");
        }
      } else {
        alert(json.error || "Invalid credentials");
        console.error("Login failed:", json);
      }
    } catch (err) {
      console.error("Login error:", err.message);
      alert("Something went wrong while logging in!");
    }
  };
  
  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center login-container mt-4">
      <div className="card shadow-lg p-4 rounded-3">
        <form onSubmit={handleSumbit}>
          <div className="text-center mb-4">
            <h2 className="fs-bold">
              <mark>
                <strong>iNotebook</strong>
              </mark>
            </h2>
            <p className="lead text-secondary">Log In to See More</p>
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={credentials.username}
              onChange={onChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Log In
          </button>

          <div className="text-center my-3">
            <p className="text-muted">OR</p>
            <Link to="#" className="btn btn-danger w-100 mb-2">
              <i className="bi bi-google me-2"></i> Continue with Google
            </Link>
          </div>

          <footer className="text-center mt-3">
            <p className="text-muted">
              By continuing, you agree to iNotebook's{" "}
              <b>Terms of Service, Privacy Policy</b>.
            </p>
            <hr />
            <p>
              Not on iNotebook yet? <Link to="/signup">Sign up</Link>
            </p>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Login;
