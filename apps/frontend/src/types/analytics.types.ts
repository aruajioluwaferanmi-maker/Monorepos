export type EventType =
  | "page_view"
  | "cta_click"
  | "modal_open"
  | "modal_close"
  | "modal_submit"
  | "form_error";

export interface AnalyticsEvent {
  event_id: string;
  event_type: EventType;
  page_url: string;
  cta_id?: string;
  modal_id?: string;
  session_id: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

export interface AnalyticsSummary {
  page_views: number;
  cta_clicks: number;
  modal_opens: number;
  modal_submits: number;
}
