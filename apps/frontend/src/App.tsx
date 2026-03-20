import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import AdminLayout from "./components/layout/AdminLayout";
import AnalyticsDashboard from "./pages/admin/AnalyticsDashboard";

const App: React.FC = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin/analytics"
        element={
          <AdminLayout>
            <AnalyticsDashboard />
          </AdminLayout>
        }
      />
    </Routes>
  </Router>
);

export default App;
