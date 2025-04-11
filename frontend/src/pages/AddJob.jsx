import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import useAuth from "../hooks/useAuth";
export default function AddJob() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);

  const showToast = ({ title, description }) => {
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
      await axios.post(
        "https://student-job-tracker-fnbb.onrender.com/api/jobs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      showToast({
        title: "Job added",
        description: "Your job application has been added successfully.",
      });
      navigate("/");
    } catch (err) {
      console.error("Error adding job:", err);
      showToast({
        title: "Error",
        description: "Failed to add job. Please try again later.",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  // Show login message if user is not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-center px-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Please login to continue
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            You need to be logged in to add a job application.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Show the form if user is logged in
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-900  mb-8">
        Add New Job Application
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md"
      >
        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="e.g. Google"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            placeholder="e.g. Frontend Developer"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Date Applied
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Link */}
        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Job Link (optional)
          </label>
          <input
            type="url"
            id="link"
            name="link"
            placeholder="https://example.com/job"
            value={formData.link}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition flex items-center"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Saving..." : "Save Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
