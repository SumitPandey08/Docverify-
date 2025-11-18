import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [hasQrCode, setHasQrCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Generate preview URL for images and clean up
  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  // Handle file selection from system
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
  };

  // Handle drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0] ?? null;
    setFile(droppedFile);
  };

  const handleVerify = () => {
    if (!file) {
      alert("Please upload a document first!");
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      const isAuthentic = Math.random() < 0.5;
      const route = isAuthentic ? "/authentic" : "/forged";
      navigate(route, {
        state: {
          fileName: file.name,
          hasQrCode,
          verifiedAt: new Date().toISOString(),
        },
      });
    }, 3000);
  };

  return (
    <div className="bg-black text-white font-sans antialiased min-h-screen flex items-center justify-center p-4">
      {!isVerifying ? (
        <div className="bg-gray-950 rounded-2xl p-8 lg:p-16 w-full max-w-xl shadow-xl animate-fade-up animate-duration-1000">
          <h1 className="text-4xl font-extrabold text-center mb-10 text-yellow-500 animate-fade-in animate-delay-300">
            Verify a Certificate
          </h1>

          {/* Upload Box */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-4 border-dashed rounded-2xl p-10 text-center cursor-pointer relative overflow-hidden transition-all duration-300 ${
              isDragging ? "border-yellow-500 bg-gray-800" : "border-gray-700 hover:border-yellow-500"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <div>
              <svg
                className="mx-auto h-20 w-20 text-yellow-500 mb-4 animate-bounce-slow"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <p className="text-gray-300 text-lg font-bold mb-2">Drag & drop or click to upload</p>
              <p className="text-gray-500 text-sm mb-6">Supported formats: PDF, JPG, PNG</p>
              <span className="bg-transparent border-2 border-yellow-500 text-yellow-500 font-bold px-8 py-4 rounded-lg inline-block hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300 transform hover:scale-110">
                Browse Files
              </span>
            </div>
          </div>

          {/* Preview */}
          {file && (
            <div className="mt-6 text-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-56 object-cover rounded-lg border border-gray-700 shadow-md"
                />
              ) : (
                <p className="text-gray-300 mt-2">📄 {file.name}</p>
              )}
            </div>
          )}

          {/* QR Code Checkbox */}
          <div className="flex items-center justify-center my-8">
            <input
              type="checkbox"
              id="qr-code-checkbox"
              checked={hasQrCode}
              onChange={() => setHasQrCode((v) => !v)}
              className="form-checkbox h-6 w-6 text-yellow-500 bg-gray-800 border-gray-600 rounded-md cursor-pointer transition-colors duration-300 focus:ring-yellow-500 focus:ring-2"
            />
            <label htmlFor="qr-code-checkbox" className="ml-3 text-gray-300 select-none text-lg">
              This document has a QR code
            </label>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            className="w-full bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300 shadow-lg transform hover:scale-105 animate-fade-in animate-delay-500"
          >
            Start Verification
          </button>
        </div>
      ) : (
        // Full-screen loading overlay
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 rounded-full border-4 border-yellow-500 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-yellow-500 animate-spin"></div>
          </div>
          <p className="text-2xl text-yellow-500 font-bold animate-pulse mt-6 tracking-widest">
            VERIFYING...
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadDocument;
