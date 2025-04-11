// components/JobCard.jsx
import { format } from "date-fns";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

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

export default function JobCard({ job, onDelete, onStatusChange }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 space-y-4 transition hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{job.company}</h3>
          <p className="text-gray-500">{job.role}</p>
        </div>
        <span className={getStatusBadgeStyle(job.status)}>{job.status}</span>
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

      <p className="text-sm text-gray-400">
        Applied on:{" "}
        {job.appliedDate && !isNaN(Date.parse(job.appliedDate))
          ? format(new Date(job.appliedDate), "dd MMM yyyy")
          : "N/A"}
      </p>

      <div className="flex justify-between items-center gap-3">
        <select
          className="text-sm p-2 rounded-lg border border-gray-300 bg-white text-gray-700"
          value={job.status}
          onChange={(e) => onStatusChange(job._id, e.target.value)}
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
            onClick={() => onDelete(job._id)}
            className="p-2 rounded hover:bg-red-100"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
