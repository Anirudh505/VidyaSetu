const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Clerk middleware — only in non-test mode (test mode uses X-Test-User-Id bypass)
if (process.env.NODE_ENV !== "test") {
  const { clerkMiddleware } = require("@clerk/express");
  app.use(clerkMiddleware());
}

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
].filter(Boolean);

function corsOrigin(origin, callback) {
  if (!origin) return callback(null, true);
  if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
    return callback(null, true);
  }
  return callback(new Error(`Origin ${origin} not allowed by CORS`));
}

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
const batchRoutes = require("./routes/batch.routes");
const sessionRoutes = require("./routes/session.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const institutionRoutes = require("./routes/institution.routes");
const programmeRoutes = require("./routes/programme.routes");

app.get("/", (req, res) => {
  res.json({ msg: "SkillBridge API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/programme", programmeRoutes);

module.exports = app;
