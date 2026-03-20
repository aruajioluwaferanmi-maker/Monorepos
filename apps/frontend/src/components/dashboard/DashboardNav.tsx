import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", icon: "🏠", path: "/" },
  { label: "Analytics", icon: "📊", path: "/admin/analytics" },
  { label: "Dashboard", icon: "🗂️", path: "/dashboard" },
];

const DashboardNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      className="
      w-full lg:w-64 bg-white
      border-b lg:border-b-0 lg:border-r
      border-gray-100 shadow-sm
      flex lg:flex-col
      p-4 gap-2
    "
    >
      {/* Logo */}
      <div
        className="
        hidden lg:flex items-center gap-3
        px-3 py-4 mb-4
        border-b border-gray-100
      "
      >
        <div
          className="
          w-8 h-8 bg-blue-600 rounded-lg
          flex items-center justify-center
          text-white font-bold text-sm
        "
        >
          A
        </div>
        <span className="font-bold text-gray-800">Admin Panel</span>
      </div>

      {/* Nav Items */}
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`
              flex items-center gap-3
              px-3 py-2.5 rounded-xl
              text-sm font-semibold
              transition-all duration-150
              w-full text-left
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }
            `}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default DashboardNav;
