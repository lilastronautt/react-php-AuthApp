import React from "react";
import { Route, Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  return !!user;
};

const PrivateRoute = ({ element: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated() ? <Component /> : <Navigate to="/initial" replace />
      }
    />
  );
};

export default PrivateRoute;
