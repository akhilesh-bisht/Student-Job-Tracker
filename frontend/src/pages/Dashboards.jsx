// pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useJobApi from "../hooks/useJobApi";
import { isAfter, isBefore } from "date-fns";
import JobCard from "../components/JobCard";
import Filters from "../components/Filters";

export default function Dashboard() {
  const { fetchJobs, deleteJob, updateJobStatus } = useJobApi();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("latest");

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

  const filteredJobs = jobs
    .filter((job) => {
      const matchStatus = statusFilter === "All" || job.status === statusFilter;
      const jobDate = job.appliedDate ? new Date(job.appliedDate) : null;

      const matchStart = startDate
        ? jobDate && isAfter(jobDate, new Date(startDate))
        : true;

      const matchEnd = endDate
        ? jobDate && isBefore(jobDate, new Date(endDate))
        : true;

      return matchStatus && matchStart && matchEnd;
    })
    .sort((a, b) =>
      sortBy === "latest"
        ? new Date(b.appliedDate) - new Date(a.appliedDate)
        : new Date(a.appliedDate) - new Date(b.appliedDate)
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 space-y-6">
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

      <Filters
        startDate={startDate}
        endDate={endDate}
        statusFilter={statusFilter}
        sortBy={sortBy}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setStatusFilter={setStatusFilter}
        setSortBy={setSortBy}
      />

      {loading ? (
        <div className="text-center text-gray-600">Loading jobs...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center text-gray-500">
          No jobs found with current filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
