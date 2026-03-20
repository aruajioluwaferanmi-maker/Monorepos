import React from "react";
import DashboardNav from "../dashboard/DashboardNav";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <DashboardNav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
