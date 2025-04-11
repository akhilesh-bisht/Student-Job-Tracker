import { Link, useNavigate } from "react-router-dom";
import { Briefcase, UserCircle, LogOut, LogIn } from "lucide-react";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
        >
          <Briefcase className="w-5 h-5" />
          Job Tracker
        </Link>

        {/* Auth controls */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <div className="hidden sm:flex flex-col text-right text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                <LogIn className="w-4 h-4" />
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
