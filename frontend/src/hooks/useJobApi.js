import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/jobs";

export default function useJobApi() {
  const fetchJobs = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (err) {
      throw new Error("Failed to fetch jobs");
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      return true;
    } catch {
      return false;
    }
  };

  const updateJobStatus = async (id, newStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/${id}`, {
        status: newStatus,
      });
      return true;
    } catch {
      return false;
    }
  };

  return {
    fetchJobs,
    deleteJob,
    updateJobStatus,
  };
}
