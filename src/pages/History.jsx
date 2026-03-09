import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../services/api";

export default function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await API.get("/resume/history");
      setHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Resume Analysis History
        </h1>

        <div className="space-y-4">

          {history.map((item) => (

            <div
              key={item._id}
              className="bg-white p-6 rounded-xl shadow"
            >

              <div className="flex justify-between items-center mb-4">

                <h2 className="font-semibold">
                  Resume Analysis
                </h2>

                <span className="text-indigo-600 font-bold">
                  {item.matchScore}%
                </span>

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