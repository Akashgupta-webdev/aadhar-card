import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "../pages/Homepage";
import Aadharpage from "../pages/Aadharpage";
import Loginpage from "../pages/Loginpage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/aadhar" element={<Aadharpage />} />
        </Route>
      </Routes>
    </Router>
  );
}
