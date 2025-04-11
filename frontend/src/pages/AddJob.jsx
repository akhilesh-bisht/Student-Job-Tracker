"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";

function AddJob() {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    date: new Date().toISOString().split("T")[0],
    link: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Replace toast functionality with native alerts or another library if you prefer.
  const showToast = ({ title, description, variant }) => {
    alert(`${title}\n${description}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your actual API endpoint
      await axios.post("http://localhost:5000/api/jobs", formData);
      showToast({
        title: "Job added",
        description: "Your job application has been added successfully.",
      });
      navigate("/");
    } catch (err) {
      console.error("Error adding job:", err);
      showToast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add job. Please try again later.",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold tracking-tight mb-6">
        Add New Job Application
      </h1>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Job Details</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Enter the details of your job application.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company */}
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Company
            </label>
            <input
              id="company"
              name="company"
              placeholder="Company name"
              value={formData.company}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white p-2"
            />
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Role
            </label>
            <input
              id="role"
              name="role"
              placeholder="Job title"
              value={formData.role}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white p-2"
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white p-2"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Date Applied */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Date Applied
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white p-2"
            />
          </div>

          {/* Job Link */}
          <div>
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Job Link (Optional)
            </label>
            <input
              id="link"
              name="link"
              type="url"
              placeholder="https://example.com/job-posting"
              value={formData.link}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white p-2"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Link to the job posting or application.
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-300 text-gray-800 rounded px-4 py-2 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition flex items-center"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Saving..." : "Save Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddJob;
