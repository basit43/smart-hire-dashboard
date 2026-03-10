import { Link } from "react-router-dom";

export default function DashboardLayout({ children }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6">

        <h2 className="text-xl font-bold mb-8">
          Smart Hire AI
        </h2>

        <nav className="space-y-4">

          <Link
            to="/dashboard"
            className="block cursor-pointer hover:text-indigo-400"
          >
            Dashboard
          </Link>

          <Link
            to="/history"
            className="block cursor-pointer hover:text-indigo-400"
          >
            History
          </Link>

          <p
            onClick={handleLogout}
            className="cursor-pointer text-red-400"
          >
            Logout
          </p>

        </nav>

      </div>

      {/* Main */}
      <div className="flex-1 bg-gray-100 p-10">
        {children}
      </div>

    </div>
  );
}