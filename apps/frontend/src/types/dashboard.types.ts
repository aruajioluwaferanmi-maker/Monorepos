export interface AnalyticsSummary {
  page_views: number;
  cta_clicks: number;
  modal_opens: number;
  modal_submits: number;
  total_events: number;
}

export interface AnalyticsEvent {
  event_id: string;
  event_type: string;
  page_url: string;
  cta_id?: string;
  modal_id?: string;
  session_id: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

export interface MetricCard {
  id: string;
  label: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
}

export interface DashboardConfig {
  title: string;
  subtitle: string;
  refreshInterval: number;
  metrics: {
    id: string;
    label: string;
    key: keyof AnalyticsSummary;
    icon: string;
    color: string;
    bgColor: string;
    description: string;
  }[];
}
