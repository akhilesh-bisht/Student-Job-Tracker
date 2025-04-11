import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobRoutes from "./routes/jobRoutes.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
dotenv.config(); // Load env variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Handles JSON payloads

// Routes
app.use("/api/jobs", jobRoutes);

// auth routes
app.use("/api/user", userRoutes);

// Fallback route for unmatched paths
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
