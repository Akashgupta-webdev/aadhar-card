import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return isAuthenticated === "true" ? <Outlet /> : <Navigate to="/login" replace />;
}
