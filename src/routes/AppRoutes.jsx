import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AadharFormPage from "../pages/AadharFormPage";
import Loginpage from "../pages/Loginpage";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layout";
import UserDashboard from "../pages/DashboardPage";
import ExpenseTracker from "../pages/ExpenseTracker";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/aadhar-form" element={<AadharFormPage />} />
            <Route path="/expense-tracker" element={<ExpenseTracker />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
