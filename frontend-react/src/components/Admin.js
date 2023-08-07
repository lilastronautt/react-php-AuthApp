import React, { useState } from "react";

import "./styles.css";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === "admin" && formData.password === "admin") {
      console.log("Admin login successful");
      navigate("/admin/panel");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="admin-container container mt-5">
      <h2 className="admin-heading text-center">Admin Login</h2>
      <form onSubmit={handleSubmit} className="admin-form mt-4">
        <div className="text-left">
          <label className="admin-label">Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="admin-label">Password </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Admin;
