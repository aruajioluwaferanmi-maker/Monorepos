import React from "react";
import {
  getEventLabel,
  getEventColor,
  formatEventTime,
} from "../../../services/analytics.service";
import { AnalyticsEvent } from "../../../types/dashboard.types";

interface LiveEventFeedProps {
  events: AnalyticsEvent[];
  loading?: boolean;
}

const LiveEventFeed: React.FC<LiveEventFeedProps> = ({ events, loading }) => {
  if (loading) {
    return (
      <div
        className="
        bg-white rounded-2xl p-6
        border border-gray-100 shadow-sm
        animate-pulse
      "
      >
        <div className="w-32 h-5 bg-gray-200 rounded mb-4" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-200" />
              <div className="w-24 h-3 bg-gray-200 rounded" />
              <div className="flex-1 h-3 bg-gray-100 rounded" />
              <div className="w-16 h-3 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const recentEvents = [...events].reverse().slice(0, 10);

  return (
    <div
      className="
      bg-white rounded-2xl p-6
      border border-gray-100 shadow-sm
    "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-700 font-bold text-sm">🔴 Live Event Feed</h3>
        <span
          className="
          text-xs text-gray-400
          bg-gray-50 px-2 py-1 rounded-full
        "
        >
          Last {recentEvents.length} events
        </span>
      </div>

      {/* Events List */}
      {recentEvents.length === 0 ? (
        <div
          className="
          flex flex-col items-center
          justify-center py-8 gap-2
        "
        >
          <span className="text-3xl">📭</span>
          <p className="text-gray-400 text-xs">No events yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
          {recentEvents.map((event) => (
            <div
              key={event.event_id}
              className="
                flex items-center gap-3
                p-3 rounded-xl
                bg-gray-50 hover:bg-gray-100
                transition-colors duration-150
              "
            >
              {/* Dot */}
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: getEventColor(event.event_type),
                }}
              />

              {/* Event Type */}
              <span
                className="text-xs font-semibold w-28 flex-shrink-0"
                style={{ color: getEventColor(event.event_type) }}
              >
                {getEventLabel(event.event_type)}
              </span>

              {/* Page URL */}
              <span
                className="
                text-xs text-gray-400
                flex-1 truncate
              "
              >
                {event.cta_id || event.modal_id || event.page_url}
              </span>

              {/* Time */}
              <span
                className="
                text-xs text-gray-300
                flex-shrink-0
              "
              >
                {formatEventTime(event.timestamp)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveEventFeed;
