import React from "react";

interface MetricCardProps {
  label: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  loading?: boolean;
}
4;

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  color,
  bgColor,
  description,
  loading,
}) => {
  if (loading) {
    return (
      <div
        className="
        bg-white rounded-2xl p-6
        border border-gray-100 shadow-sm
        animate-pulse
      "
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-xl" />
          <div className="w-16 h-8 bg-gray-200 rounded-lg" />
        </div>
        <div className="w-24 h-4 bg-gray-200 rounded mt-2" />
        <div className="w-32 h-3 bg-gray-100 rounded mt-2" />
      </div>
    );
  }

  return (
    <div
      className="
      bg-white rounded-2xl p-6
      border border-gray-100 shadow-sm
      hover:shadow-md hover:-translate-y-0.5
      transition-all duration-200
      cursor-default
    "
    >
      {/* Top Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: bgColor }}
        >
          {icon}
        </div>

        {/* Value */}
        <span className="text-3xl font-extrabold" style={{ color }}>
          {value.toLocaleString()}
        </span>
      </div>

      {/* Label */}
      <p className="text-gray-800 font-semibold text-sm">{label}</p>

      {/* Description */}
      <p className="text-gray-400 text-xs mt-1">{description}</p>
    </div>
  );
};

export default MetricCard;
