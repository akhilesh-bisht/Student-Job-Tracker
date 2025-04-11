import Job from "../models/job.model.js";

/**
 * Get all jobs
 */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    return res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Create a new job entry
 */
export const addJob = async (req, res) => {
  try {
    const { company, role, status, appliedDate, link } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: "Company and role are required" });
    }

    const job = new Job({ company, role, status, appliedDate, link });
    const savedJob = await job.save();

    return res.status(201).json(savedJob);
  } catch (err) {
    console.error("Error adding job:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Update job status
 */
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(updatedJob);
  } catch (err) {
    console.error("Error updating status:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Delete a job by ID
 */
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error deleting job:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
