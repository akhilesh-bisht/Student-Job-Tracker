"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";

function EditJob() {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "",
    date: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    setFetchLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
      setFormData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching job:", err);
      setError("Failed to fetch job details. Please try again later.");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/jobs/${id}/status`, formData);
      alert("Job updated successfully.");
      navigate("/");
    } catch (err) {
      console.error("Error updating job:", err);
      alert("Failed to update job.");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-300 rounded w-3/4 mb-6"></div>
          <div className="bg-white p-6 rounded shadow space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Edit Job Application</h1>
        <div className="bg-red-100 text-red-700 p-4 rounded border border-red-300">
          <h2 className="font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={fetchJob}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Job Application</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="company">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="role">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Job title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="date">
            Date Applied
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="link">
            Job Link (Optional)
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://example.com/job-posting"
          />
          <p className="text-sm text-gray-500 mt-1">
            Link to the job posting or application.
          </p>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Saving..." : "Update Job"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditJob;
