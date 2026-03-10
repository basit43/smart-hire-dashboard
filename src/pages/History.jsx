import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../services/api";

export default function History() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await API.get("/resume/history");
      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHistory = async (id) => {

  if (!window.confirm("Delete this analysis?")) return;

  try {

    await API.delete(`/resume/history/${id}`);

    setHistory(history.filter(item => item._id !== id));

  } catch (error) {

    console.error(error);
    alert("Failed to delete history");

  }

};

  return (
    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Resume Analysis History
        </h1>

        {loading && (
          <p className="text-gray-500">Loading history...</p>
        )}

<div className="space-y-4">

  {history.length === 0 && !loading && (

    <div className="bg-white p-10 rounded-xl shadow text-center">

      <h2 className="text-xl font-semibold mb-2">
        No history yet
      </h2>

      <p className="text-gray-500">
        Upload a resume and analyze it to see results here.
      </p>

    </div>

  )}

  {history.map((item) => (

            <div
              key={item._id}
              className="bg-white p-6 rounded-xl shadow"
            >

            <div className="flex justify-between items-center mb-4">

              <h2 className="font-semibold">
                Resume Analysis
              </h2>

              <div className="flex items-center gap-4">

                <span className="text-indigo-600 font-bold">
                  {item.matchScore}%
                </span>

                <button
                  onClick={() => deleteHistory(item._id)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Delete
                </button>

              </div>

            </div>

              <p className="text-gray-600 text-sm">
                {new Date(item.createdAt).toLocaleString()}
              </p>

              <p className="mt-4 text-gray-700">
                {item.summary}
              </p>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}