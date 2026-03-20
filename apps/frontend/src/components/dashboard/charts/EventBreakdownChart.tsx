import React from "react";
import {
  getEventColor,
  getEventLabel,
} from "../../../services/analytics.service";

interface EventBreakdownChartProps {
  data: Record<string, number>;
  loading?: boolean;
}

const EventBreakdownChart: React.FC<EventBreakdownChartProps> = ({
  data,
  loading,
}) => {
  const total = Object.values(data).reduce((a, b) => a + b, 0);

  if (loading) {
    return (
      <div
        className="
        bg-white rounded-2xl p-6
        border border-gray-100 shadow-sm
        animate-pulse
      "
      >
        <div className="w-40 h-5 bg-gray-200 rounded mb-6" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-24 h-3 bg-gray-200 rounded" />
              <div className="flex-1 h-6 bg-gray-100 rounded-lg" />
              <div className="w-8 h-3 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!total) {
    return (
      <div
        className="
        bg-white rounded-2xl p-6
        border border-gray-100 shadow-sm
        flex flex-col items-center justify-center
        min-h-48 gap-3
      "
      >
        <span className="text-4xl">📭</span>
        <p className="text-gray-400 text-sm font-medium">
          No events recorded yet
        </p>
        <p className="text-gray-300 text-xs">
          Interact with the homepage to see data here
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      bg-white rounded-2xl p-6
      border border-gray-100 shadow-sm
    "
    >
      <h3 className="text-gray-700 font-bold text-sm mb-6">
        📊 Event Breakdown
      </h3>

      <div className="flex flex-col gap-4">
        {Object.entries(data)
          .sort((a, b) => b[1] - a[1])
          .map(([eventType, count]) => {
            const percentage = total ? Math.round((count / total) * 100) : 0;
            const color = getEventColor(eventType);
            const label = getEventLabel(eventType);

            return (
              <div key={eventType}>
                {/* Label + Count */}
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-600">
                    {label}
                  </span>
                  <span className="text-xs font-bold text-gray-800">
                    {count} ({percentage}%)
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-700"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default EventBreakdownChart;
