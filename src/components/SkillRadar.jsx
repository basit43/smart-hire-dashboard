import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function SkillRadar({ matchedSkills }) {

  const categories = {
    Flutter: ["flutter", "dart"],
    Architecture: ["mvvm", "clean", "architecture", "bloc", "provider", "riverpod"],
    API: ["rest", "api", "json"],
    Security: ["jwt", "oauth", "authentication", "secure"],
    DevOps: ["git", "ci", "cd", "docker"],
    Mobile: ["android", "ios"]
  };

  const scores = Object.values(categories).map((skills) => {
    const matched = skills.filter((s) => matchedSkills.includes(s));
    return Math.round((matched.length / skills.length) * 100);
  });

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Skill Match",
        data: scores,
        backgroundColor: "rgba(79,70,229,0.2)",
        borderColor: "#4F46E5",
        borderWidth: 2
      }
    ]
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8">
      <h3 className="text-lg font-semibold mb-4">
        Skill Analysis
      </h3>

      <Radar data={data} options={options} />
    </div>
  );
}