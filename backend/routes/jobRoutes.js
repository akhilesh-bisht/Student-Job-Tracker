import express from "express";
import {
  getJobs,
  addJob,
  updateStatus,
  deleteJob,
} from "../controller/jobController.js";

const router = express.Router();

// GET /api/jobs - Fetch all jobs
router.get("/", getJobs);

// POST /api/jobs - Add a new job
router.post("/", addJob);

// PATCH /api/jobs/:id/status - Update job status
router.patch("/:id/status", updateStatus);

// DELETE /api/jobs/:id - Delete a job
router.delete("/:id", deleteJob);

export default router;
