import { useEffect, useState } from "react";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import useJobApi from "../hooks/useJobApi";
import { format, subDays, isAfter, isBefore } from "date-fns";

// Badge color by status
const getStatusBadgeStyle = (status) => {
  const base = "text-xs font-semibold px-2 py-1 rounded-full";
  const styles = {
    Applied: "bg-blue-100 text-blue-700",
    Interview: "bg-yellow-100 text-yellow-800",
    Offer: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-700",
  };
  return `${base} ${styles[status] || "bg-gray-100 text-gray-700"}`;
};

export default function Dashboard() {
  const { fetchJobs, deleteJob, updateJobStatus } = useJobApi();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (err) {
      console.error("Error loading jobs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    const success = await deleteJob(_id);
    if (success) {
      setJobs((prev) => prev.filter((job) => job._id !== _id));
    }
  };

  const handleStatusChange = async (_id, newStatus) => {
    const success = await updateJobStatus(_id, newStatus);
    if (success) {
      setJobs((prev) =>
        prev.map((job) =>
          job._id === _id ? { ...job, status: newStatus } : job
        )
      );
    }
  };

  // Apply filters
  const filteredJobs = jobs.filter((job) => {
    const matchStatus = statusFilter === "All" || job.status === statusFilter;

    const jobDate = job.appliedDate ? new Date(job.appliedDate) : null;

    const matchStart = startDate
      ? jobDate && isAfter(jobDate, new Date(startDate))
      : true;

    const matchEnd = endDate
      ? jobDate && isBefore(jobDate, new Date(endDate))
      : true;

    return matchStatus && matchStart && matchEnd;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Tracker</h1>
          <p className="text-gray-600">Keep track of your job applications</p>
        </div>
        <Link
          to="/add"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow"
        >
          Add Job
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="block mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="block mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block mt-1 border border-gray-300 rounded px-3 py-2 text-sm bg-white text-gray-700"
          >
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2">
          <button
            onClick={() =>
              setStartDate(format(subDays(new Date(), 30), "yyyy-MM-dd"))
            }
            className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded"
          >
            Last 30d
          </button>
          <button
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setStatusFilter("All");
            }}
            className="text-xs px-3 py-1 bg-gray-200 text-gray-800 rounded"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-gray-600">Loading jobs...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center text-gray-500">
          No jobs found with current filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl p-5 shadow-md border border-gray-100 space-y-4 transition hover:shadow-lg"
            >
              {/* Job Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {job.company}
                  </h3>
                  <p className="text-gray-500">{job.role}</p>
                </div>
                <span className={getStatusBadgeStyle(job.status)}>
                  {job.status}
                </span>
              </div>

              {/* Optional Job Link */}
              {job.link && (
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  Job Link
                </a>
              )}

              {/* Applied Date */}
              <p className="text-sm text-gray-400">
                Applied on:{" "}
                {job.appliedDate && !isNaN(Date.parse(job.appliedDate))
                  ? format(new Date(job.appliedDate), "dd MMM yyyy")
                  : "N/A"}
              </p>

              {/* Status Dropdown + Actions */}
              <div className="flex justify-between items-center gap-3">
                <select
                  className="text-sm p-2 rounded-lg border border-gray-300 bg-white text-gray-700"
                  value={job.status}
                  onChange={(e) => handleStatusChange(job._id, e.target.value)}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <div className="flex gap-2">
                  <Link to={`/edit/${job._id}`}>
                    <button className="p-2 rounded hover:bg-gray-100">
                      <Pencil className="w-4 h-4 text-gray-600" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="p-2 rounded hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
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
