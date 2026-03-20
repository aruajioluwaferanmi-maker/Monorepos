import { AnalyticsEvent, EventType } from "../types/analytics.types";
import { getSessionId, generateEventId } from "./session";

// Feature flag check
const isAnalyticsEnabled = (): boolean => {
  try {
    return import.meta.env.VITE_ANALYTICS_ENABLED !== "false";
  } catch {
    return true;
  }
};

// Build event payload
const buildEvent = (
  eventType: EventType,
  extras?: Partial<AnalyticsEvent>,
): AnalyticsEvent => {
  return {
    event_id: generateEventId(),
    event_type: eventType,
    page_url: window.location.pathname,
    session_id: getSessionId(),
    timestamp: new Date().toISOString(),
    ...extras,
  };
};

// Core track function
export const trackEvent = (
  eventType: EventType,
  extras?: Partial<AnalyticsEvent>,
): void => {
  if (!isAnalyticsEnabled()) return;

  const event = buildEvent(eventType, extras);

  // Log to console in development
  if (import.meta.env.DEV) {
    console.log("[Analytics]", event);
  }

  // Store locally for dashboard
  storeEventLocally(event);

  // Send to backend asynchronously — non-blocking
  sendEventToBackend(event).catch((err) => {
    if (import.meta.env.DEV) {
      console.warn("[Analytics] Failed to send event:", err);
    }
  });
};

// Store event in sessionStorage for local dashboard
const storeEventLocally = (event: AnalyticsEvent): void => {
  try {
    const stored = sessionStorage.getItem("analytics_events");
    const events: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];
    events.push(event);
    // Keep last 100 events only
    if (events.length > 100) events.shift();
    sessionStorage.setItem("analytics_events", JSON.stringify(events));
  } catch {
    // Fail silently
  }
};

// Send event to backend API
const sendEventToBackend = async (event: AnalyticsEvent): Promise<void> => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  await fetch(`${apiUrl}/api/v1/analytics/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
    // Use keepalive so event sends even if page navigates away
    keepalive: true,
  });
};

// Get locally stored events
export const getStoredEvents = (): AnalyticsEvent[] => {
  try {
    const stored = sessionStorage.getItem("analytics_events");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Clear stored events
export const clearStoredEvents = (): void => {
  try {
    sessionStorage.removeItem("analytics_events");
  } catch {
    // Fail silently
  }
};

// Convenience helpers
export const trackPageView = (metadata?: Record<string, string>) => {
  trackEvent("page_view", { metadata });
};

export const trackCTAClick = (ctaId: string) => {
  trackEvent("cta_click", { cta_id: ctaId });
};

export const trackModalOpen = (modalId: string) => {
  trackEvent("modal_open", { modal_id: modalId });
};

export const trackModalClose = (modalId: string) => {
  trackEvent("modal_close", { modal_id: modalId });
};

export const trackModalSubmit = (modalId: string) => {
  trackEvent("modal_submit", { modal_id: modalId });
};

export const trackFormError = (modalId: string) => {
  trackEvent("form_error", { modal_id: modalId });
};
