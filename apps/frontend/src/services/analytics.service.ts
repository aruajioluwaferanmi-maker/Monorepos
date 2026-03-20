import { AnalyticsSummary, AnalyticsEvent } from "../types/dashboard.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Fetch analytics summary from backend
export const fetchAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  const res = await fetch(`${API_URL}/api/v1/analytics/summary`);
  if (!res.ok) throw new Error("Failed to fetch summary");
  const data = await res.json();
  return data.data;
};

// Fetch all analytics events from backend
export const fetchAnalyticsEvents = async (): Promise<AnalyticsEvent[]> => {
  const res = await fetch(`${API_URL}/api/v1/analytics/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();
  return data.data;
};

// Calculate CTA click rate
export const calculateCTR = (summary: AnalyticsSummary): string => {
  if (!summary.page_views) return "0%";
  const rate = (summary.cta_clicks / summary.page_views) * 100;
  return rate.toFixed(1) + "%";
};

// Calculate modal conversion rate
export const calculateModalRate = (summary: AnalyticsSummary): string => {
  if (!summary.modal_opens) return "0%";
  const rate = (summary.modal_submits / summary.modal_opens) * 100;
  return rate.toFixed(1) + "%";
};

// Group events by type for chart
export const groupEventsByType = (
  events: AnalyticsEvent[],
): Record<string, number> => {
  return events.reduce(
    (acc, event) => {
      acc[event.event_type] = (acc[event.event_type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
};

// Format timestamp to readable time
export const formatEventTime = (timestamp: string): string => {
  return new Date(timestamp).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

// Get event type label
export const getEventLabel = (eventType: string): string => {
  const labels: Record<string, string> = {
    page_view: "Page View",
    cta_click: "CTA Click",
    modal_open: "Modal Open",
    modal_close: "Modal Close",
    modal_submit: "Form Submit",
    form_error: "Form Error",
  };
  return labels[eventType] || eventType;
};

// Get event colour
export const getEventColor = (eventType: string): string => {
  const colors: Record<string, string> = {
    page_view: "#2563eb",
    cta_click: "#7c3aed",
    modal_open: "#059669",
    modal_close: "#6b7280",
    modal_submit: "#d97706",
    form_error: "#dc2626",
  };
  return colors[eventType] || "#6b7280";
};
