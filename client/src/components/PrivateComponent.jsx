import React from "react";
import useAuthStatus from "../hooks/useAuthStatus";
import Loading from "./Loading";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const { isLoggedIn, checkStatus } = useAuthStatus();

  if (checkStatus) {
    return <Loading />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateComponent;
