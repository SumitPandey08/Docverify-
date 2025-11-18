import React from "react";
import { useNavigate } from "react-router-dom";

const DocumentAuthentic = () => {
  const navigate = useNavigate();
  const confidenceScore = 92; // Example static, can pass via state/props later

  return (
    <div className="bg-black text-white font-sans antialiased min-h-screen flex items-center justify-center">
      <div className="bg-gray-950 rounded-2xl p-8 lg:p-16 w-full max-w-lg text-center shadow-xl animate-fade-in animate-duration-1000">
        
        {/* Animated Authentic Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative w-40 h-40">
            <svg
              className="absolute inset-0 w-full h-full text-green-600 animate-pulse animate-duration-1000 animate-infinite"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
            </svg>
            <svg
              className="absolute inset-0 w-full h-full text-green-500 animate-scale-in animate-duration-1000"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Title and Message */}
        <h1 className="text-5xl font-extrabold text-green-500 mb-4 animate-fade-in animate-delay-300">
          Authentic
        </h1>
        <p className="text-gray-300 text-lg mb-8 animate-fade-in animate-delay-500">
          This document has been successfully verified and is confirmed to be authentic.
        </p>

        {/* Confidence Display */}
        <p className="text-3xl font-bold text-green-400 mb-8">
          {confidenceScore}% Confidence
        </p>

        {/* Call to Action */}
        <button
          onClick={() => navigate("/confidence")}
          className="w-full bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300 shadow-lg transform hover:scale-105 animate-fade-in animate-delay-700"
        >
          View Confidence Breakdown
        </button>
      </div>
    </div>
  );
};

export default DocumentAuthentic;
