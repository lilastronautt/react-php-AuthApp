import React, { useState } from "react";
import { Link } from "react-router-dom";
import countryCode from "./CountryCodes.json";
import axios from "axios";

import { ThreeDots } from "react-loader-spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilePic: null,
    password: "",
  });
  const [serverStatus, setServerStatus] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  console.log(serverMsg);
  console.log(serverMsg.message);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePicChange = (e) => {
    setFormData({
      ...formData,
      profilePic: e.target.files[0],
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (formData.firstName.length < 3) {
      newErrors.firstName = "First name should be at least 3 characters";
      isValid = false;
    }
    if (formData.lastName.length < 3) {
      newErrors.lastName = "Last name should be at least 3 characters";
      isValid = false;
    }
    const emailPattern = /^[A-Za-z0-9._%+-]+@gmail.com$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid Gmail address";
      isValid = false;
    }
    const phonePattern = /^\d+$/;
    if (!phonePattern.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
      isValid = false;
    }
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        "Password should be at least 8 characters with 1 capital letter, 1 special character, and 1 number";
      isValid = false;
    }
    if (formData.profilePic && formData.profilePic.size > 2 * 1024 * 1024) {
      newErrors.profilePic = "Profile picture size should be less than 2MB";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("firstName", formData.firstName);
        formDataToSend.append("lastName", formData.lastName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phoneNumber", formData.phoneNumber);
        formDataToSend.append("profilePic", formData.profilePic);
        formDataToSend.append("password", formData.password);
        console.log(formDataToSend);
        const response = await axios.post(
          "http://localhost/backend-php/registration.php",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setServerStatus(true);
        setServerMsg(response.data);
        setIsLoading(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          profilePic: null,
          password: "",
        });
        setErrors({});
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
      }
    }
  };

  return (
    <div className="container p-2 register-container">
      <h2 className="text-center register-info">Register</h2>
      <form onSubmit={handleSubmit} className="w-50 m-auto">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          className="form-control my-3"
          onChange={handleChange}
          required
        />
        {errors.firstName && <p className="error-msg">{errors.firstName}</p>}

        <input
          type="text"
          name="lastName"
          className="form-control my-3"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        {errors.lastName && <p className="error-msg">{errors.lastName}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          className="form-control my-3"
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error-msg">{errors.email}</p>}
        <span>
          <select className="p-2 country-code form-control">
            {countryCode.map((e) => (
              <option
                className="p-2"
                key={e.name}
                selected={e.name === "India"}
              >
                {e.name} {e.dial_code}
              </option>
            ))}
          </select>
        </span>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          className="form-control my-3"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        {errors.phoneNumber && (
          <p className="error-msg">{errors.phoneNumber}</p>
        )}
        <div className="pt-2">
          <p> Select Profile pic </p>
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleProfilePicChange}
            required
          />
          {errors.profilePic && (
            <p className="error-msg">{errors.profilePic}</p>
          )}
        </div>
        <input
          type="password"
          name="password"
          className="form-control my-3"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error-msg">{errors.password}</p>}
        <div className="text-center">
          {serverStatus && (
            <p className={serverMsg.status === "success" ? "green" : "red"}>
              {" "}
              {serverMsg.message}
            </p>
          )}
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <ThreeDots type="Oval" color="#fff" height={20} width={20} />
            ) : (
              "Register"
            )}
          </button>
        </div>
      </form>
      <Link to="/login">
        <p className="text-center mt-2">Already registered?</p>
      </Link>
    </div>
  );
};

export default Register;
