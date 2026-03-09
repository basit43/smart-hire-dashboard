import { Link } from "react-router-dom";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-darkbg text-white p-6">
        <h2 className="text-xl font-bold mb-8">Smart Hire AI</h2>
    <nav className="space-y-4">

      <Link to="/dashboard" className="block hover:text-indigo-400">
        Dashboard
      </Link>

      <Link to="/history" className="block hover:text-indigo-400">
        History
      </Link>

      <p
        className="hover:text-red-400 cursor-pointer"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </p>

    </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
}