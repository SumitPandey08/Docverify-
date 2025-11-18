import React from "react";

const DocumentForged = () => {
  return (
    <div className="bg-black text-white font-sans antialiased min-h-screen flex items-center justify-center">
      <div className="bg-gray-950 rounded-2xl p-8 lg:p-16 w-full max-w-lg text-center shadow-xl animate-fade-in animate-duration-1000">
        <div className="flex justify-center mb-8">
          <div className="relative w-40 h-40">
            <svg
              className="absolute inset-0 w-full h-full text-red-600 animate-pulse animate-duration-1000 animate-infinite"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
            </svg>
            <svg
              className="absolute inset-0 w-full h-full text-red-500 animate-scale-in animate-duration-1000"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-5xl font-extrabold text-red-500 mb-4 animate-fade-in animate-delay-300">
          Forged
        </h1>
        <p className="text-gray-300 text-lg mb-8 animate-fade-in animate-delay-500">
          This document has been verified and is found to be forged or invalid.
        </p>

        <button className="w-full bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300 shadow-lg transform hover:scale-105 animate-fade-in animate-delay-700">
          Try Again
        </button>
      </div>
    </div>
  );
};

export default DocumentForged;
