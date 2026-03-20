import request from "supertest";
import app from "../src/index";

describe("Analytics Endpoints", () => {
  const mockEvent = {
    event_id: "evt_test_123",
    event_type: "page_view",
    page_url: "/",
    session_id: "sess_test_abc",
    timestamp: new Date().toISOString(),
  };

  test("POST /analytics/events returns 201", async () => {
    const res = await request(app)
      .post("/api/v1/analytics/events")
      .send(mockEvent);
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("ok");
  });

  test("POST /analytics/events with missing fields returns 400", async () => {
    const res = await request(app)
      .post("/api/v1/analytics/events")
      .send({ event_type: "page_view" });
    expect(res.statusCode).toBe(400);
  });

  test("GET /analytics/summary returns counts", async () => {
    const res = await request(app).get("/api/v1/analytics/summary");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("page_views");
    expect(res.body.data).toHaveProperty("cta_clicks");
    expect(res.body.data).toHaveProperty("modal_opens");
  });

  test("GET /analytics/events returns array", async () => {
    const res = await request(app).get("/api/v1/analytics/events");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
