import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "../components/Loader";
import { Cpu } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserProvider";

export default function ProtectedRoute() {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center gap-2.5">
        <Loader size="lg" />
        <div className="flex items-center">
          <span className="text-xl font-semibold text-slate-800">
            Cyberworld
          </span>
          <Cpu className="w-12 -translate-x-1 text-slate-800" />
        </div>
      </div>
    );
  }

  return user.id ? <Outlet /> : <Navigate to="/login" replace />;
}
