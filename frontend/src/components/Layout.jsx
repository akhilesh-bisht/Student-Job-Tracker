import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="min-h-screen bg-background  bg-gray-50 text-gray-800 shadow-md">
      <Navbar />
      <main className="container mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
