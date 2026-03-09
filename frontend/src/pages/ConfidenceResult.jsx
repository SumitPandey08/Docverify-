import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, ChevronRight, FileText, AlertTriangle, CheckCircle2 } from "lucide-react";

const ScoreDisplay = ({ title, score, details, icon }) => {
  const getScoreStyles = (s) => {
    if (s >= 85) return { text: "text-green-500", border: "border-green-500", bg: "bg-green-500/10" };
    if (s >= 65) return { text: "text-yellow-500", border: "border-yellow-500", bg: "bg-yellow-500/10" };
    return { text: "text-red-500", border: "border-red-500", bg: "bg-red-500/10" };
  };
  const { text, border, bg } = getScoreStyles(score);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-900/50 p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all`}
    >
      <div className={`absolute top-0 left-0 w-1 h-full ${bg.replace('10', '40')} ${text}`}></div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${bg} ${text}`}>
            {icon}
          </div>
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{title}</h4>
        </div>
        <span className={`text-3xl font-black ${text}`}>{score}%</span>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">{details}</p>
    </motion.div>
  );
};

const ConfidenceResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scores, status, analysis, verificationId } = location.state || {
    scores: { finalScore: 0, textualAccuracy: 0, visualCNNMatch: 0, databaseTrust: 0, logicConsistency: 0 },
    status: 'unknown',
    analysis: 'No analysis data available.'
  };

  const aggregateScore = scores.finalScore;

  const verdict =
    status === 'verified'
      ? "Verification Successful"
      : aggregateScore >= 65
      ? "Flagged for Review"
      : "Verification Failed";

  const verdictColor =
    status === 'verified'
      ? "text-green-500"
      : aggregateScore >= 65
      ? "text-yellow-500"
      : "text-red-500";

  const verdictIcon = status === 'verified' ? 
    <CheckCircle2 className="w-16 h-16 text-green-500" /> : 
    <AlertTriangle className="w-16 h-16 text-red-500" />;

  return (
    <div className="bg-black text-white font-sans antialiased min-h-screen pt-28 pb-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex justify-center mb-6"
          >
            {verdictIcon}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-5xl md:text-6xl font-black mb-6 tracking-tight ${verdictColor}`}
          >
            {verdict}
          </motion.h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            AI Agent analysis complete. Below is the multi-layered confidence breakdown of the document's authenticity.
          </p>
        </div>

        {/* Main Score & Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Overall Score Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 bg-gray-950 border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden group"
          >
            <div className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-gradient-to-b from-transparent to-white/5`}></div>
            <h2 className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-8">Overall Trust Score</h2>
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-900"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={552.92}
                  strokeDashoffset={552.92 - (552.92 * aggregateScore) / 100}
                  className={`${verdictColor} transition-all duration-1000 ease-out`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-black">{aggregateScore}<span className="text-2xl opacity-40">%</span></span>
              </div>
            </div>
            <p className="mt-8 text-sm font-bold text-gray-400">Assurance Level: {aggregateScore > 80 ? 'High' : aggregateScore > 50 ? 'Medium' : 'Low'}</p>
          </motion.div>

          {/* Detailed Breakdown */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScoreDisplay
              title="Textual Accuracy"
              score={scores.textualAccuracy}
              icon={<FileText className="w-5 h-5" />}
              details="Measures OCR reliability and matching accuracy against provided user identity data."
            />
            <ScoreDisplay
              title="Visual CNN Match"
              score={scores.visualCNNMatch}
              icon={<ShieldCheck className="w-5 h-5" />}
              details="Neural network analysis of layout, font integrity, and positioning of official seals."
            />
            <ScoreDisplay
              title="Database Trust"
              score={scores.databaseTrust}
              icon={<CheckCircle2 className="w-5 h-5" />}
              details="Direct cross-reference check against the issuing organization's secure records."
            />
            <ScoreDisplay
              title="Logic Consistency"
              score={scores.logicConsistency}
              icon={<ChevronRight className="w-5 h-5" />}
              details="Validation of expiry dates, required field formats, and QR code data integrity."
            />
          </div>
        </div>

        {/* AI Analysis Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-950 border border-white/5 rounded-[2.5rem] p-10 mb-12"
        >
          <h3 className="text-xl font-black mb-6 flex items-center gap-3">
            <ShieldCheck className="text-yellow-500 w-6 h-6" />
            AI Agent Deep Analysis
          </h3>
          <div className="text-gray-400 leading-relaxed font-medium whitespace-pre-line">
            {analysis}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button
            onClick={() => navigate("/report", { state: location.state })}
            className="w-full md:w-auto px-12 py-5 bg-white text-black rounded-2xl font-black text-lg shadow-xl hover:bg-gray-200 transition-all transform hover:-translate-y-1"
          >
            View Detailed Audit Report
          </button>
          <button
            onClick={() => navigate("/userDashboard")}
            className="w-full md:w-auto px-12 py-5 bg-gray-900 text-white border border-white/10 rounded-2xl font-black text-lg hover:bg-gray-800 transition-all"
          >
            Back to Vault
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceResult;
