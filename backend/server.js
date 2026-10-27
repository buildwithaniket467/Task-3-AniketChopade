require("dotenv").config(); // Load environment variables from .env FIRST

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

// ─── Connect to MongoDB ───────────────────────
connectDB();

// ─── Create Express App ───────────────────────
const app = express();

// ─── Middleware ───────────────────────────────
app.use(cors()); // Allow cross-origin requests from the React frontend
app.use(express.json()); // Parse incoming JSON request bodies

// ─── API Routes ───────────────────────────────
app.use("/api/students", studentRoutes);

// ─── Health Check Route ───────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Student Management API is running." });
});

// ─── 404 Handler (unknown routes) ────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ─── Global Error Handler ─────────────────────
// Catches any error thrown inside route handlers (via next(err))
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ success: false, message: "Internal server error." });
});

// ─── Start Server ─────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
