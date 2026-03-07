import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, AlertTriangle, FileText, Calendar, ArrowLeft, RefreshCw } from "lucide-react";

const DocumentForged = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  // Fallback state if accessed directly
  const analysis = state?.analysis || "Document failed verification checks due to detected anomalies.";
  const fileName = state?.fileName || "Unknown Document";
  const verifiedAt = state?.verifiedAt ? new Date(state.verifiedAt).toLocaleString() : new Date().toLocaleString();
  const verificationId = state?.verificationId || "N/A";

  return (
    <div className="bg-black text-white font-sans antialiased min-h-screen flex flex-col items-center justify-center p-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gray-950/80 backdrop-blur-md rounded-3xl p-8 lg:p-12 w-full max-w-3xl border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.1)] relative overflow-hidden"
      >
        {/* Warning Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-32 bg-red-600/20 blur-[100px] pointer-events-none"></div>

        {/* Animated Forged Icon */}
        <div className="flex justify-center mb-6 relative z-10">
          <motion.div 
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="relative w-32 h-32 flex items-center justify-center bg-red-500/10 rounded-full"
          >
            <XCircle className="w-20 h-20 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
          </motion.div>
        </div>

        {/* Title and Message */}
        <div className="text-center mb-10 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-600 mb-4"
          >
            Verification Failed
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 text-lg"
          >
            This document has been flagged as <span className="font-semibold text-red-400">Forged or Invalid</span>.
          </motion.p>
        </div>

        {/* Details Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-900 rounded-2xl p-6 mb-8 border border-red-900/50 relative z-10"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="text-red-500" /> Rejection Details
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

          <div className="mt-6 pt-6 border-t border-red-900/30">
            <p className="text-sm text-gray-400 mb-3">AI Agent Analysis & Anomalies</p>
            <div className="bg-red-950/20 rounded-xl p-5 border border-red-900/40">
              <pre className="text-red-200 font-sans whitespace-pre-wrap leading-relaxed text-sm">
                {analysis}
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors border border-gray-700"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <button
            onClick={() => navigate("/upload")} // Adjust route if needed
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-xl hover:from-red-500 hover:to-rose-500 transition-colors shadow-lg shadow-red-500/20"
          >
            <RefreshCw className="w-5 h-5" /> Try Another Document
          </button>
        </motion.div>

        {verificationId !== "N/A" && (
          <p className="text-center text-gray-600 text-xs mt-8 relative z-10">
            Verification Ref: {verificationId}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default DocumentForged;
