import React from "react";

const VerificationReport = () => {
  return (
    <div className="bg-black text-white font-sans antialiased min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-950 rounded-2xl p-8 lg:p-16 shadow-xl w-full max-w-2xl animate-fade-in animate-duration-1000">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-white text-center mb-2">
          Verification Report
        </h1>
        <p className="text-gray-400 text-center mb-12 animate-fade-in animate-delay-200">
          Document ID: DOC-12345-XYZ789
        </p>

        <div className="space-y-12">
          {/* Metadata */}
          <div className="animate-fade-in animate-delay-300">
            <h2 className="text-2xl font-bold text-yellow-500 mb-6">Metadata</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm">Student Name</span>
                <span className="text-lg font-semibold text-white">
                  Alice Wonderland
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm">
                  Issuing Institution
                </span>
                <span className="text-lg font-semibold text-white">
                  Quantum University
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm">Degree</span>
                <span className="text-lg font-semibold text-white">
                  Master of Science in AI
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm">Graduation Date</span>
                <span className="text-lg font-semibold text-white">
                  June 15, 2023
                </span>
              </div>
            </div>
          </div>

          {/* Verification Checks */}
          <div className="border-t border-gray-800 pt-12 animate-fade-in animate-delay-500">
            <h2 className="text-2xl font-bold text-yellow-500 mb-6">
              Verification Checks
            </h2>
            <ul className="space-y-6">
              {[
                {
                  name: "Database Match",
                  description: "Document found in official academic records.",
                },
                {
                  name: "Fuzzy Matching",
                  description:
                    "No significant discrepancies detected against known templates.",
                },
                {
                  name: "AI Anomaly Detection",
                  description:
                    "No unusual patterns or signs of tampering identified.",
                },
                {
                  name: "Blockchain Integrity",
                  description:
                    "Document hash matches blockchain record, ensuring immutability.",
                },
              ].map((check, i) => (
                <li key={i} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0 animate-scale-in"
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
                  <div>
                    <h3 className="font-semibold text-lg">{check.name}</h3>
                    <p className="text-gray-400 text-sm">{check.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="border-t border-gray-800 pt-12 animate-fade-in animate-delay-700">
            <h2 className="text-2xl font-bold text-yellow-500 mb-6">
              Contact for Further Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400 mr-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13h9a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-white">registrar@quantumuni.edu</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400 mr-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-white">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-sm text-gray-500 animate-fade-in animate-delay-900">
          <p>Verification Date: October 26, 2023</p>
          <p>Verifier: System Automated</p>
        </div>

        {/* Download Button */}
        <button className="w-full mt-12 bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300 shadow-lg transform hover:scale-105 animate-fade-in animate-delay-1000">
          <span className="mr-2">Download Report</span>
          <svg
            className="w-5 h-5 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VerificationReport;
