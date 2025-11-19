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
import ToolsLinkPage from "../pages/ToolsLinkPage";
import GovernmentLinkPage from "../pages/GovernmentLinkPage";
import AadharCardPage from "../pages/AadharCardPage";
import AadharPage from "../pages/AadharPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/aadhar" element={<AadharPage />} />
            <Route path="/aadhar-form" element={<AadharFormPage />} />
            <Route path="/aadhar-detail/:id" element={<AadharCardPage />} />
            <Route path="/expense-tracker" element={<ExpenseTracker />} />
            <Route path="/government-links" element={<GovernmentLinkPage />} />
            <Route path="/tools" element={<ToolsLinkPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
