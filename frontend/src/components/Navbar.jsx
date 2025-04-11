import { Link } from "react-router-dom";

import { Briefcase } from "lucide-react";

function Navbar() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-gray-800 dark:text-white"
        >
          <Briefcase className="h-5 w-5" />
          <span>Job Tracker</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/add">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Add New Job
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
