import React, { useState, useEffect, useCallback } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import MetricCard from "../../components/dashboard/widgets/MetricCard";
import ConversionWidget from "../../components/dashboard/widgets/ConversionWidget";
import EventBreakdownChart from "../../components/dashboard/charts/EventBreakdownChart";
import LiveEventFeed from "../../components/dashboard/widgets/LiveEventFeed";
import {
  fetchAnalyticsSummary,
  fetchAnalyticsEvents,
  calculateCTR,
  calculateModalRate,
  groupEventsByType,
} from "../../services/analytics.service";
import {
  AnalyticsSummary,
  AnalyticsEvent,
  DashboardConfig,
} from "../../types/dashboard.types";

const AnalyticsDashboard: React.FC = () => {
  const [config, setConfig] = useState<DashboardConfig | null>(null);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("--");
  const [error, setError] = useState<string | null>(null);

  // Load config
  useEffect(() => {
    import("../../config/dashboard-analytics.json").then((data) =>
      setConfig(data.default as DashboardConfig),
    );
  }, []);

  // Fetch analytics data
  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      setError(null);

      const [summaryData, eventsData] = await Promise.all([
        fetchAnalyticsSummary(),
        fetchAnalyticsEvents(),
      ]);

      setSummary(summaryData);
      setEvents(eventsData);
      setLastUpdated(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    } catch {
      setError("Unable to load analytics. Make sure the backend is running.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto refresh every 30 seconds
  useEffect(() => {
    if (!config) return;
    const interval = setInterval(() => {
      fetchData(true);
    }, config.refreshInterval);
    return () => clearInterval(interval);
  }, [config, fetchData]);

  const eventBreakdown = groupEventsByType(events);
  const ctr = summary ? calculateCTR(summary) : "0%";
  const modalRate = summary ? calculateModalRate(summary) : "0%";

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {config && (
          <DashboardHeader
            title={config.title}
            subtitle={config.subtitle}
            lastUpdated={lastUpdated}
            onRefresh={() => fetchData(true)}
            refreshing={refreshing}
          />
        )}

        {/* Error State */}
        {error && (
          <div
            className="
            bg-red-50 border border-red-200
            rounded-2xl p-4 mb-6
            flex items-center gap-3
          "
          >
            <span className="text-red-500 text-xl">⚠️</span>
            <div>
              <p className="text-red-700 font-semibold text-sm">
                Connection Error
              </p>
              <p className="text-red-500 text-xs mt-0.5">{error}</p>
            </div>
            <button
              onClick={() => fetchData()}
              className="
                ml-auto text-xs font-semibold
                text-red-600 hover:text-red-800
                underline
              "
            >
              Retry
            </button>
          </div>
        )}

        {/* Metric Cards Grid */}
        <div
          className="
          grid grid-cols-2 lg:grid-cols-5
          gap-4 mb-6
        "
        >
          {config?.metrics.map((metric) => (
            <MetricCard
              key={metric.id}
              label={metric.label}
              value={summary?.[metric.key] ?? 0}
              icon={metric.icon}
              color={metric.color}
              bgColor={metric.bgColor}
              description={metric.description}
              loading={loading}
            />
          ))}
        </div>

        {/* Middle Row — Conversion + Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ConversionWidget ctr={ctr} modalRate={modalRate} loading={loading} />
          <EventBreakdownChart data={eventBreakdown} loading={loading} />
        </div>

        {/* Bottom Row — Live Feed */}
        <LiveEventFeed events={events} loading={loading} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
