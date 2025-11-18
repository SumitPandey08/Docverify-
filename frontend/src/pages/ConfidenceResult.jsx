import React from "react";
import { useNavigate } from "react-router-dom";

const ScoreDisplay = ({ title, score, details }) => {
  const getScoreStyles = (s) => {
    if (s >= 85) return { text: "text-green-500", border: "border-green-500" };
    if (s >= 65) return { text: "text-yellow-500", border: "border-yellow-500" };
    return { text: "text-red-500", border: "border-red-500" };
  };
  const { text, border } = getScoreStyles(score);

  return (
    <div className={`bg-gray-800/50 p-5 rounded-xl border-l-4 ${border}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <span className={`text-3xl font-extrabold ${text}`}>{score}%</span>
      </div>
      <p className="text-sm text-gray-400 mt-2">{details}</p>
    </div>
  );
};

const ConfidenceResult = () => {
  const navigate = useNavigate();

  const scores = {
    text: 95,
    logic: 78,
    image: 62,
  };
  const aggregateScore = Math.floor(
    (scores.text + scores.logic + scores.image) / 3
  );

  const verdict =
    aggregateScore >= 80
      ? "Verified with High Confidence"
      : aggregateScore >= 65
      ? "Flagged for Review"
      : "Unverified (Potential Forgery)";

  const verdictColor =
    aggregateScore >= 80
      ? "text-green-500"
      : aggregateScore >= 65
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="bg-black text-white font-sans antialiased min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-950 rounded-2xl p-8 lg:p-16 shadow-xl w-full max-w-4xl animate-fade-in animate-duration-1000">
        {/* Header */}
        <h1 className={`text-4xl font-extrabold mb-4 ${verdictColor}`}>
          {verdict}
        </h1>
        <p className="text-gray-300 text-lg mb-10 text-center">
          Combined confidence score across all AI models.
        </p>

        {/* Overall Score */}
        <div className="text-center p-6 border-2 border-dashed border-yellow-500/50 rounded-xl mb-10">
          <h2 className="text-xl font-bold mb-2 text-yellow-400">
            Overall Confidence Score
          </h2>
          <p className={`text-6xl font-black ${verdictColor}`}>
            {aggregateScore}%
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScoreDisplay
            title="Text / OCR"
            score={scores.text}
            details="High accuracy in text recognition."
          />
          <ScoreDisplay
            title="Logic / Context"
            score={scores.logic}
            details="Minor inconsistencies detected in data."
          />
          <ScoreDisplay
            title="Image / Visual"
            score={scores.image}
            details="Seal quality and font integrity flagged."
          />
        </div>

        {/* Next Step */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/report")}
            className="px-10 py-4 bg-yellow-500 text-black rounded-full font-bold shadow-lg hover:bg-yellow-400 transition-colors transform hover:scale-[1.02]"
          >
            View Full Verification Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceResult;
