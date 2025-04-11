import { format, subDays } from "date-fns";

export default function Filters({
  startDate,
  endDate,
  statusFilter,
  sortBy,
  setStartDate,
  setEndDate,
  setStatusFilter,
  setSortBy,
}) {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div>
        <label className="text-sm font-medium text-gray-700">Start Date</label>
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

      <div>
        <label className="text-sm font-medium text-gray-700">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="block mt-1 border border-gray-300 rounded px-3 py-2 text-sm bg-white text-gray-700"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

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
            setSortBy("latest");
          }}
          className="text-xs px-3 py-1 bg-gray-200 text-gray-800 rounded"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
