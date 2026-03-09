import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, File, QrCode, Loader2, ShieldCheck } from "lucide-react";

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

  const handleVerify = async () => {
    if (!file) {
      alert("Please upload a document first!");
      return;
    }

    setIsVerifying(true);

    try {
      const formData = new FormData();
      formData.append("document", file);
      
      const userId = localStorage.getItem("userId") || "60d5ecb3a32f622858a3c89d";
      const orgId = localStorage.getItem("orgId") || "60d5ecb3a32f622858a3c89c";
      
      formData.append("userId", userId); 
      formData.append("organizationId", orgId);
      formData.append("documentType", "Degree Certificate");

      const response = await fetch("http://localhost:5000/api/documents/verify", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Verification failed");
      }

      const result = await response.json();
      const isAuthentic = result.status === 'verified';
      
      // Navigate to confidence result page with all data
      navigate("/confidence", {
        state: {
          fileName: file.name,
          hasQrCode,
          verifiedAt: new Date().toISOString(),
          analysis: result.analysis,
          verificationId: result.verificationId,
          scores: result.scores,
          status: result.status
        },
      });
    } catch (error) {
      console.error("Error during verification:", error);
      alert("Error during verification: " + error.message);
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-black text-white font-sans antialiased min-h-screen flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {!isVerifying ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-950/80 backdrop-blur-md rounded-3xl p-8 lg:p-12 w-full max-w-2xl border border-gray-800 shadow-2xl relative z-10"
          >
            <div className="text-center mb-10">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-500/10 p-4 rounded-full">
                  <ShieldCheck className="w-12 h-12 text-yellow-500" />
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
                Verify Document
              </h1>
              <p className="text-gray-400">
                Upload your certificate or official document for AI-powered verification.
              </p>
            </div>

            {/* Upload Box */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
                isDragging 
                  ? "border-yellow-500 bg-yellow-500/5" 
                  : "border-gray-700 bg-gray-900/50 hover:border-yellow-500/50 hover:bg-gray-800"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              
              <div className="flex flex-col items-center">
                <motion.div 
                  animate={{ y: [0, -5, 0] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <UploadCloud className="w-16 h-16 text-yellow-500 mb-4" />
                </motion.div>
                <p className="text-gray-200 text-lg font-semibold mb-2">
                  Drag & drop your file here
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  Supported formats: PDF, JPG, PNG (Max 10MB)
                </p>
                <button className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl border border-gray-700 transition-colors">
                  Browse Files
                </button>
              </div>
            </div>

            {/* File Preview */}
            <AnimatePresence>
              {file && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 overflow-hidden">
                      {previewUrl ? (
                        <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-700">
                          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 border border-gray-700">
                          <File className="text-gray-400 w-6 h-6" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-gray-200 font-medium truncate">{file.name}</p>
                        <p className="text-gray-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setPreviewUrl(null);
                      }}
                      className="text-gray-500 hover:text-red-400 p-2"
                    >
                      ✕
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* QR Code Checkbox */}
            <div className="flex items-center justify-center mt-8 mb-8">
              <label className="flex items-center cursor-pointer group">
                <div className="relative flex items-center justify-center w-6 h-6 rounded border border-gray-600 bg-gray-900 group-hover:border-yellow-500 transition-colors">
                  <input
                    type="checkbox"
                    checked={hasQrCode}
                    onChange={() => setHasQrCode((v) => !v)}
                    className="opacity-0 absolute w-full h-full cursor-pointer"
                  />
                  {hasQrCode && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>
                  )}
                </div>
                <span className="ml-3 text-gray-300 font-medium flex items-center gap-2 group-hover:text-white transition-colors">
                  <QrCode className="w-4 h-4 text-gray-400" />
                  Document contains a QR code
                </span>
              </label>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={!file}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg ${
                file 
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-400 hover:to-orange-400 hover:shadow-yellow-500/20 transform hover:-translate-y-0.5" 
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              Start Verification
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-8 z-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl"></div>
              <Loader2 className="w-24 h-24 text-yellow-500 animate-spin relative z-10" />
            </div>
            <motion.h2 
              animate={{ opacity: [0.5, 1, 0.5] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-2xl font-bold text-yellow-500 mt-8 tracking-wider"
            >
              ANALYZING DOCUMENT
            </motion.h2>
            <p className="text-gray-400 mt-3 text-center max-w-sm">
              Our AI agent is currently extracting text, validating visual features, and cross-referencing records.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadDocument;
