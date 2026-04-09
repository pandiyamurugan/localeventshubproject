import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/evenRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

// DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// 🔥 DEBUG MIDDLEWARE (VERY IMPORTANT)
app.use((req, res, next) => {
  console.log("➡️ REQUEST:", req.method, req.url);
  next();
});


app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/bookings", bookingRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running Successfully 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);