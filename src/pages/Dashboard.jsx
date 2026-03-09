import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../services/api";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeError, setResumeError] = useState("");
  const [jobError, setJobError] = useState("");
  const [progress, setProgress] = useState(0);

const handleAnalyze = async () => {
  setResumeError("");
  setJobError("");

  if (!resume) {
    setResumeError("Please upload a resume.");
    return;
  }

  if (!jobDescription.trim()) {
    setJobError("Please enter a job description.");
    return;
  }

  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("jobDescription", jobDescription);

  try {
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 300);

    const { data } = await API.post("/resume/upload", formData);

    clearInterval(interval);

    setProgress(100);

    setTimeout(() => {
      setResult(data);
      setLoading(false);
    }, 400);

  } catch (err) {
    console.error(err);
    alert("Analysis failed");
    setLoading(false);
  }
};

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">AI Resume Analyzer</h1>

        {/* Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>

          <input
            type="file"
            accept=".pdf"
            className="mb-4"
            onChange={(e) => setResume(e.target.files[0])}
          />
          {resumeError && (
          <p className="text-red-500 text-sm mb-4">{resumeError}</p>
          )}

          <textarea
            placeholder="Paste job description..."
            className="w-full border rounded-lg p-3 mb-4"
            rows="6"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          {jobError && (
          <p className="text-red-500 text-sm mb-4">{jobError}</p>
          )}

          <button
            onClick={handleAnalyze}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {loading && <Loader progress={progress} />}

        {/* Results */}
        {result && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-6">Analysis Result</h2>

            <p className="text-lg mb-6">
              Match Score:
              <span className="ml-2 font-bold text-indigo-600 text-xl">
                {result.matchScore}%
              </span>
            </p>

            <h3 className="font-semibold mb-2">Resume Summary</h3>
            <p className="text-gray-700 mb-6">{result.summary}</p>

            <h3 className="font-semibold mb-2">Matched Skills</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {result.matchedKeywords.map((skill, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            <h3 className="font-semibold mb-2">Missing Skills</h3>
            <div className="flex flex-wrap gap-2">
              {result.missingKeywords.map((skill, i) => (
                <span
                  key={i}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}