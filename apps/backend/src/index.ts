import express, { Request, Response } from "express";
import cors from "cors";
import analyticsRoutes from "./routes/analytics.routes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }),
);

// Health check
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// Analytics routes
app.use("/api/v1/analytics", analyticsRoutes);

const PORT = process.env.API_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

export default app;
