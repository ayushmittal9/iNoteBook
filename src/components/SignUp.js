import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    name: "",
    email: "",
    age: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          name: credentials.name,
          email: credentials.email,
          age: credentials.age,
          password: credentials.password,
        }),
      });
  
      let json;
      try {
        json = await response.json();
      } catch (jsonError) {
        const text = await response.text();
        throw new Error(`Server Error: ${text}`);
      }
  
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
        console.error("Request failed or success is false", json);
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert("Signup failed: " + error.message);
    }
  };
  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center signup-container mt-4">
      <div className="card shadow-lg p-4 rounded-3">
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <h2 className="fs-bold">
              <mark>
                <strong>iNotebook</strong>
              </mark>
            </h2>
            <p className="lead text-secondary">Create a New Account</p>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email address"
              required
            />
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
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              className="form-control"
              id="age"
              name="age"
              value={credentials.age}
              onChange={onChange}
              placeholder="Enter your age"
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
              placeholder="Choose a strong password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>

          <footer className="text-center mt-3">
            <p className="text-muted">
              By signing up, you agree to iNotebook's{" "}
              <b>Terms of Service, Privacy Policy</b>.
            </p>
            <hr />
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Signup;
