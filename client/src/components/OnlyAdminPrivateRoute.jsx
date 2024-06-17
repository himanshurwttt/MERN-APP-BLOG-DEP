import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return <>{currentUser.isAdmin ? <Outlet /> : <Navigate to={"/"} />}</>;
}
