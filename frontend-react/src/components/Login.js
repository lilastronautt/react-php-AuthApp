import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost/backend-php/login.php",
        formData
      );

      const responseData = response.data;
      setIsLoading(false);
      if (responseData.status === "success") {
        toast.success(responseData.message);

        setFormData({ email: "", password: "" });
        navigate("/dashboard");
        localStorage.setItem("user", JSON.stringify(responseData.user));
        console.log(responseData);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="container p-2 login-container">
      <ToastContainer />
      <h2 className="text-center mt-5 login-info">Login</h2>
      <form className="w-50 m-auto" onSubmit={handleSubmit}>
        <label id="email" className="mb-2 mt-4 login-label">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label id="password" className="mb-2 mt-4 login-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="text-center">
          <button className="btn btn-primary mt-4" type="submit">
            {isLoading ? (
              <ThreeDots type="Oval" color="#fff" height={20} width={20} />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>

      <Link to="/register">
        <p className="text-center mt-2">Not registered yet?</p>
      </Link>
    </div>
  );
};

export default Login;
