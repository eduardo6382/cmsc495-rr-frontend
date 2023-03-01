import React from "react";
import { Navigate } from "react-router-dom";

const WithPrivateRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("recipe"));
  return token ? children: <Navigate to="/login" />
};

export default WithPrivateRoute;