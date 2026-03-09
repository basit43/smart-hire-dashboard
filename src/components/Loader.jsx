export default function Loader({ progress }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">

      <div className="relative w-32 h-32">

        <svg className="transform -rotate-90 w-32 h-32">

          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />

          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#4F46E5"
            strokeWidth="10"
            fill="none"
            strokeDasharray={350}
            strokeDashoffset={350 - (350 * progress) / 100}
            strokeLinecap="round"
          />

        </svg>

        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
          {progress}%
        </div>

      </div>

      <p className="mt-4 text-gray-500">
        Analyzing Resume with AI...
      </p>

    </div>
  );
}