import { useEffect, useState } from "react";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import useJobApi from "../hooks/useJobApi";
import { format } from "date-fns";

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

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (err) {
      console.error("Error loading jobs", err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const success = await deleteJob(id);
    if (success) setJobs(jobs.filter((job) => job.id !== id));
  };

  const handleStatusChange = async (id, newStatus) => {
    const success = await updateJobStatus(id, newStatus);
    if (success) {
      setJobs((prev) =>
        prev.map((job) => (job.id === id ? { ...job, status: newStatus } : job))
      );
    }
  };

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

      {loading ? (
        <div className="text-center text-gray-600">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center text-gray-500">
          No jobs found. Add one to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl p-5 shadow-md border border-gray-100 space-y-4 transition hover:shadow-lg"
            >
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

              {/* You can show apply date if needed */}
              {/* <p className="text-sm text-gray-400">
                Applied on: {format(new Date(job.date), "PPP")}
              </p> */}

              <div className="flex justify-between items-center gap-3">
                <select
                  className="text-sm p-2 rounded-lg border border-gray-300 bg-white text-gray-700"
                  value={job.status}
                  onChange={(e) => handleStatusChange(job.id, e.target.value)}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <div className="flex gap-2">
                  <Link to={`/edit/${job.id}`}>
                    <button className="p-2 rounded hover:bg-gray-100">
                      <Pencil className="w-4 h-4 text-gray-600" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(job.id)}
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
