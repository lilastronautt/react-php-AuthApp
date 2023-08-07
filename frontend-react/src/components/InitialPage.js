import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const InitialPage = () => {
  return (
    <div className="initial-page-container">
      <h2 className="initial-info">Welcome to the Auth Application </h2>
      <div className="initial-button-container">
        <button className="initial-button">
          <Link className="link" to="/register">
            User Register
          </Link>
        </button>
        <button className="initial-button">
          <Link className="link" to="/login">
            User Login
          </Link>
        </button>
        <button className="initial-button">
          <Link className="link" to="/admin">
            Admin Login
          </Link>
        </button>
      </div>
    </div>
  );
};

export default InitialPage;
