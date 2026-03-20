import request from "supertest";
import app from "../src/index";

describe("Analytics Summary", () => {
  beforeAll(async () => {
    // Seed some test events
    const events = [
      {
        event_id: "evt_001",
        event_type: "page_view",
        page_url: "/",
        session_id: "sess_test",
        timestamp: new Date().toISOString(),
      },
      {
        event_id: "evt_002",
        event_type: "cta_click",
        page_url: "/",
        cta_id: "cta_work_with_me",
        session_id: "sess_test",
        timestamp: new Date().toISOString(),
      },
      {
        event_id: "evt_003",
        event_type: "modal_open",
        page_url: "/",
        modal_id: "modal_work_with_me",
        session_id: "sess_test",
        timestamp: new Date().toISOString(),
      },
      {
        event_id: "evt_004",
        event_type: "modal_submit",
        page_url: "/",
        modal_id: "modal_work_with_me",
        session_id: "sess_test",
        timestamp: new Date().toISOString(),
      },
    ];

    for (const event of events) {
      await request(app).post("/api/v1/analytics/events").send(event);
    }
  });

  test("Summary returns correct counts", async () => {
    const res = await request(app).get("/api/v1/analytics/summary");

    expect(res.statusCode).toBe(200);
    expect(res.body.data.page_views).toBeGreaterThanOrEqual(1);
    expect(res.body.data.cta_clicks).toBeGreaterThanOrEqual(1);
    expect(res.body.data.modal_opens).toBeGreaterThanOrEqual(1);
    expect(res.body.data.modal_submits).toBeGreaterThanOrEqual(1);
  });

  test("Events list is not empty after seeding", async () => {
    const res = await request(app).get("/api/v1/analytics/events");

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});
