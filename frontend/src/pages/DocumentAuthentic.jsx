import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, FileText, Calendar, ArrowLeft } from "lucide-react";

const DocumentAuthentic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  // Fallback state if accessed directly
  const analysis = state?.analysis || "Document passed all verification checks and is confirmed authentic.";
  const fileName = state?.fileName || "Unknown Document";
  const verifiedAt = state?.verifiedAt ? new Date(state.verifiedAt).toLocaleString() : new Date().toLocaleString();
  const verificationId = state?.verificationId || "N/A";

  return (
    <div className="bg-black text-white font-sans antialiased min-h-screen flex flex-col items-center justify-center p-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gray-950/80 backdrop-blur-md rounded-3xl p-8 lg:p-12 w-full max-w-3xl border border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.1)]"
      >
        {/* Animated Authentic Icon */}
        <div className="flex justify-center mb-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="relative w-32 h-32 flex items-center justify-center bg-green-500/10 rounded-full"
          >
            <CheckCircle className="w-20 h-20 text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
          </motion.div>
        </div>

        {/* Title and Message */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-4"
          >
            Document Verified
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 text-lg"
          >
            This document has been successfully verified and is confirmed to be <span className="font-semibold text-green-400">Authentic</span>.
          </motion.p>
        </div>

        {/* Details Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-900 rounded-2xl p-6 mb-8 border border-gray-800"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="text-green-500" /> Verification Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start gap-3">
              <FileText className="text-gray-400 w-5 h-5 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">File Name</p>
                <p className="text-gray-200 font-medium break-all">{fileName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="text-gray-400 w-5 h-5 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Verified On</p>
                <p className="text-gray-200 font-medium">{verifiedAt}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-500 mb-3">AI Agent Analysis</p>
            <div className="bg-black/50 rounded-xl p-5 border border-gray-800/50">
              <pre className="text-gray-300 font-sans whitespace-pre-wrap leading-relaxed text-sm">
                {analysis}
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors border border-gray-700"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Upload
          </button>
          <button
            onClick={() => navigate("/dashboard")} // Adjust route if needed
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-xl hover:from-green-400 hover:to-emerald-500 transition-colors shadow-lg shadow-green-500/20"
          >
            Go to Dashboard
          </button>
        </motion.div>

        {verificationId !== "N/A" && (
          <p className="text-center text-gray-600 text-xs mt-8">
            Verification Ref: {verificationId}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default DocumentAuthentic;
