import DashboardLayout from "../layout/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-gray-600">
        Upload your resume and analyze job match.
      </p>
    </DashboardLayout>
  );
}