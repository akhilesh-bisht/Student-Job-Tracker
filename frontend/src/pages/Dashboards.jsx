"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { Pencil, Trash2, ExternalLink } from "lucide-react";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, statusFilter, dateFilter]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/jobs");
      setJobs(response.data);
      setFilteredJobs(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((job) => job.status === statusFilter);
    }

    if (dateFilter && dateFilter !== "all") {
      const today = new Date();
      const oneDay = 24 * 60 * 60 * 1000;

      filtered = filtered.filter((job) => {
        const jobDate = new Date(job.date);
        const diffDays = Math.abs((today - jobDate) / oneDay);

        if (dateFilter === "last7days") return diffDays <= 7;
        if (dateFilter === "last30days") return diffDays <= 30;
        if (dateFilter === "last90days") return diffDays <= 90;
        return true;
      });
    }

    setFilteredJobs(filtered);
  };

  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/jobs/${id}`, {
        status: newStatus,
      });
      setJobs(
        jobs.map((job) =>
          job.id === id ? { ...job, status: newStatus } : job
        )
      );
    } catch {
      setJobs(
        jobs.map((job) =>
          job.id === id ? { ...job, status: newStatus } : job
        )
      );
    }
  };

  const getStatusClass = (status) => {
    const map = {
      Applied: "bg-blue-100 text-blue-800",
      Interview: "bg-yellow-100 text-yellow-800",
      Offer: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
    };
    return map[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Job Applications</h1>
          <p className="text-gray-500">Track and manage your job applications.</p>
        </div>
        <Link to="/add">
          <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
            Add New Job
          </button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            className="p-2 border rounded w-full sm:w-1/3"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            className="p-2 border rounded w-full sm:w-1/3"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All Dates</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last90days">Last 90 Days</option>
          </select>

          <button
            className="p-2 border rounded w-full sm:w-1/3 hover:bg-gray-100"
            onClick={() => {
              setStatusFilter("");
              setDateFilter("");
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 border rounded shadow animate-pulse space-y-2"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-800 border border-red-200 rounded">
          {error}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="p-4 border rounded text-center">
          <h3 className="font-semibold text-lg">No Jobs Found</h3>
          <p className="text-gray-500 mt-2">
            {statusFilter || dateFilter
              ? "No jobs match your current filters."
              : "You haven't added any job applications yet."}
          </p>
          <Link to="/add">
            <button className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
              Add New Job
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="p-4 border rounded shadow space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-lg">{job.company}</h4>
                  <p className="text-gray-500">{job.role}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getStatusClass(
                    job.status
                  )}`}
                >
                  {job.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Date Applied:</strong>{" "}
                {format(new Date(job.date), "MMM dd, yyyy")}
              </div>
              {job.link && (
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Job Posting
                </a>
              )}
              <div className="flex justify-between items-center">
                <select
                  value={job.status}
                  onChange={(e) =>
                    handleUpdateStatus(job.id, e.target.value)
                  }
                  className="p-2 border rounded"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <div className="flex gap-2">
                  <Link to={`/edit/${job.id}`}>
                    <button className="p-2 border rounded hover:bg-gray-100">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="p-2 border rounded hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
