import React from "react";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  onRefresh: () => void;
  refreshing: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  lastUpdated,
  onRefresh,
  refreshing,
}) => {
  return (
    <div
      className="
      flex flex-col sm:flex-row
      items-start sm:items-center
      justify-between gap-4 mb-8
    "
    >
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-800">{title}</h1>
        <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Last Updated */}
        <span className="text-xs text-gray-400">Updated: {lastUpdated}</span>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className={`
            flex items-center gap-2
            px-4 py-2 rounded-xl
            text-sm font-semibold
            transition-all duration-200
            ${
              refreshing
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
            }
          `}
        >
          <span className={refreshing ? "animate-spin" : ""}>🔄</span>
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
