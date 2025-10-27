import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div>loading...</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
