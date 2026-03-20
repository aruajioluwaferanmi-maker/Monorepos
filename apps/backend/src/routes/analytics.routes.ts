import { Router, Request, Response } from "express";

const router = Router();

// In-memory store for now — Week 2 will connect to Supabase
const events: any[] = [];

// POST /api/v1/analytics/events
router.post("/events", (req: Request, res: Response) => {
  try {
    const event = req.body;

    // Basic validation
    if (!event.event_type || !event.session_id || !event.timestamp) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    // Sanitize — no sensitive data stored
    const safeEvent = {
      event_id: event.event_id,
      event_type: event.event_type,
      page_url: event.page_url,
      cta_id: event.cta_id || null,
      modal_id: event.modal_id || null,
      session_id: event.session_id,
      timestamp: event.timestamp,
      metadata: event.metadata || {},
    };

    events.push(safeEvent);

    console.log("[Analytics] Event received:", safeEvent.event_type);

    return res.status(201).json({ status: "ok" });
  } catch {
    return res.status(500).json({
      status: "error",
      message: "Failed to store event",
    });
  }
});

// GET /api/v1/analytics/summary
router.get("/summary", (req: Request, res: Response) => {
  try {
    const summary = {
      page_views: events.filter((e) => e.event_type === "page_view").length,
      cta_clicks: events.filter((e) => e.event_type === "cta_click").length,
      modal_opens: events.filter((e) => e.event_type === "modal_open").length,
      modal_submits: events.filter((e) => e.event_type === "modal_submit")
        .length,
      total_events: events.length,
    };

    return res.status(200).json({ status: "ok", data: summary });
  } catch {
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve summary",
    });
  }
});

// GET /api/v1/analytics/events
router.get("/events", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    data: events.slice(-50), // Return last 50 events
  });
});

export default router;
