import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../services/api";
import Loader from "../components/Loader";
import SkillRadar from "../components/SkillRadar";

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
      
      console.log("Sending form data:", {
        resumeName: resume.name,
        jobDescription: jobDescription.substring(0, 100) + "..." // Log only the first 100 chars
      });
      const { data } = await API.post("/resume/upload", formData);

      clearInterval(interval);

      setProgress(100);

      setTimeout(() => {
        setResult(data);
        setLoading(false);
      }, 400);

    }
    catch (err) {

      console.error("Full Error Object:", err);

      if (err.response) {
        console.error("Server Error:", err.response.data);
        alert(err.response.data.message || "Server error");
      } else {
        alert("Network error");
      }

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

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 cursor-pointer
          ${resume ? "border-green-400 bg-green-50" : "border-gray-300 bg-gray-50"}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file && file.type === "application/pdf") {
              setResume(file);
              setResumeError("");
            } else {
              setResumeError("Please upload a PDF file.");
            }
          }}
          onClick={() => document.getElementById("fileInput").click()}
        >

          {!resume && (
            <>
              <p className="text-gray-600 mb-2">
                Drag & drop your resume here
              </p>
              <p className="text-sm text-gray-400">
                or click to browse
              </p>
            </>
          )}

          {resume && (
            <p className="text-green-600 font-semibold">
              {resume.name}
            </p>
          )}

          <input
            id="fileInput"
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && file.type === "application/pdf") {
                setResume(file);
                setResumeError("");
              } else {
                setResumeError("Please upload a PDF file.");
              }
            }}
          />

          </div>
          {resumeError && (
          <p className="text-red-500 text-sm mb-4">
            {resumeError}
          </p>
          )}

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

          <p className="text-sm text-indigo-600 mb-2">
          Paste ONLY technical skills and requirements for correct analysis. Avoid including company info, benefits, or other non-technical details.
          </p>

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

            <h3 className="font-semibold mt-6 mb-2">ATS Compatibility</h3>

            <p className="text-lg mb-4">
              ATS Score:
              <span className="ml-2 font-bold text-indigo-600 text-xl">
                {result.atsScore}%
              </span>
            </p>

            <h3 className="font-semibold mb-2">Resume Summary</h3>
            <p className="text-gray-700 mb-6">{result.summary}</p>

            <h3 className="font-semibold mb-2 mt-8">Skill Match</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {result.matchedKeywords.map((skill,i)=>(
            <div
            key={i}
            className="p-3 bg-green-50 border border-green-200 rounded-lg"
            >
            <span className="text-green-700 font-medium">
            {skill.toUpperCase()}
            </span>
            </div>
            ))}

            </div>

            <h3 className="font-semibold mb-2 mt-8">Skills To Improve</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {result.missingKeywords.map((skill,i)=>(
            <div
            key={i}
            className="p-3 bg-red-50 border border-red-200 rounded-lg"
            >
            <span className="text-red-600 font-medium">
            {skill.toUpperCase()}
            </span>
            </div>
            ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}