import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "../components/layout";
import ProtectedRoute from "./ProtectedRoute";
import AadharPage from "../pages/aadhar/AadharPage";
import AadharFormPage from "../pages/aadhar/AadharFormPage";
import AadharCardPage from "../pages/aadhar/AadharCardPage";
import AadharCardEditPage from "../pages/aadhar/AadharCardEditPage";
import Loginpage from "../pages/auth/Loginpage";
import UserDashboard from "../pages/dashboard/DashboardPage";
import ExpenseTracker from "../pages/tools-page/ExpenseTracker";
import ToolsLinkPage from "../pages/tools-page/ToolsLinkPage";
import GovernmentLinkPage from "../pages/government/GovernmentLinkPage";
import AdminPage from "../pages/admin/AdminPage";

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
            <Route path="/aadhar-edit/:id" element={<AadharCardEditPage />} />
            <Route path="/expense-tracker" element={<ExpenseTracker />} />
            <Route path="/government-links" element={<GovernmentLinkPage />} />
            <Route path="/tools" element={<ToolsLinkPage />} />            
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
