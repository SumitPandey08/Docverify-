import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, File, QrCode, Loader2, ShieldCheck, ChevronDown, Globe } from "lucide-react";

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [hasQrCode, setHasQrCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [availableModels, setAvailableModels] = useState([]);
  const [orgId, setOrgId] = useState("");
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Load user data and fetch organization models
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/auth/login");
      return;
    }

    const fetchAllAvailableModels = async () => {
      setIsLoadingModels(true);
      try {
        // 1. First, try to get models for the user's assigned organization
        const res = await fetch(`http://localhost:5000/api/users/${userId}/dashboard`);
        let userOrgId = null;
        
        if (res.ok) {
          const data = await res.json();
          userOrgId = data.user.organizationId;
          setOrgId(userOrgId);
          
          const orgRes = await fetch(`http://localhost:5000/api/organizations/${userOrgId}/dashboard`);
          if (orgRes.ok) {
            const orgData = await orgRes.json();
            const models = (orgData.organization.documentModels || []).map(m => ({
              ...m,
              orgName: orgData.organization.name,
              orgId: userOrgId
            }));
            
            if (models.length > 0) {
              setAvailableModels(models);
              setDocumentType(models[0].name);
              setIsLoadingModels(false);
              return;
            }
          }
        }

        // 2. Fallback: If user has no models or org, fetch ALL organizations to find any available templates
        console.log("No specific org templates found, fetching all public templates...");
        const allOrgsRes = await fetch(`http://localhost:5000/api/organizations/${userOrgId || "any"}/dashboard`); // This is a bit of a hack, let's try to find a better endpoint or just use the dashboard one if it supports lists
        
        // Since we don't have a "list all models" endpoint yet, we'll fetch from the common ones
        // In a real app, you'd have a /api/models endpoint
        const fallbackRes = await fetch('http://localhost:5000/api/organizations');
        if (fallbackRes.ok) {
          const orgs = await fallbackRes.json();
          let allModels = [];
          orgs.forEach(org => {
            if (org.documentModels) {
              org.documentModels.forEach(m => {
                allModels.push({ ...m, orgName: org.name, orgId: org._id });
              });
            }
          });
          setAvailableModels(allModels);
          if (allModels.length > 0) {
            setDocumentType(allModels[0].name);
            setOrgId(allModels[0].orgId);
          }
        }
      } catch (error) {
        console.error("Error loading models:", error);
      } finally {
        setIsLoadingModels(false);
      }
    };

    fetchAllAvailableModels();
  }, [navigate]);

  // Update orgId when documentType changes (if we have multiple orgs in list)
  const handleModelChange = (e) => {
    const selectedName = e.target.value;
    setDocumentType(selectedName);
    const model = availableModels.find(m => m.name === selectedName);
    if (model) {
      setOrgId(model.orgId);
    }
  };

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

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0] ?? null;
    setFile(droppedFile);
  };

  const handleVerify = async () => {
    if (!file || !documentType) return;

    setIsVerifying(true);
    try {
      const formData = new FormData();
      formData.append("document", file);
      formData.append("userId", localStorage.getItem("userId")); 
      formData.append("organizationId", orgId);
      formData.append("documentType", documentType);

      const response = await fetch("http://localhost:5000/api/documents/verify", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Verification failed");

      const result = await response.json();
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
      alert("Error: " + error.message);
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-black text-white font-sans antialiased min-h-screen flex items-center justify-center p-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {!isVerifying ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
                Select a template and upload your document for AI-powered analysis.
              </p>
            </div>

            {/* Document Type Selection */}
            <div className="mb-8">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">
                {isLoadingModels ? "Loading Templates..." : "Select Verification Template"}
              </label>
              <div className="relative">
                <select
                  value={documentType}
                  onChange={handleModelChange}
                  disabled={isLoadingModels}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white appearance-none focus:outline-none focus:border-yellow-500/50 transition-all cursor-pointer disabled:opacity-50"
                >
                  {availableModels.length > 0 ? (
                    availableModels.map((model, idx) => (
                      <option key={idx} value={model.name}>
                        {model.name} ({model.orgName})
                      </option>
                    ))
                  ) : (
                    <option value="">{isLoadingModels ? "Fetching templates..." : "No templates available"}</option>
                  )}
                </select>
                {isLoadingModels ? (
                  <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-500 animate-spin w-5 h-5" />
                ) : (
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
                )}
              </div>
              {!isLoadingModels && availableModels.length === 0 && (
                <p className="text-red-400 text-[10px] mt-2 ml-1 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Could not find any templates. Please create one in the Organization Portal.
                </p>
              )}
            </div>

            {/* Upload Box */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
                isDragging ? "border-yellow-500 bg-yellow-500/5" : "border-gray-700 bg-gray-900/50 hover:border-yellow-500/50 hover:bg-gray-800"
              }`}
            >
              <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileChange} />
              <div className="flex flex-col items-center">
                <UploadCloud className="w-16 h-16 text-yellow-500 mb-4" />
                <p className="text-gray-200 text-lg font-semibold mb-2">Drag & drop your file here</p>
                <p className="text-gray-500 text-sm mb-6">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
                <button className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl border border-gray-700 transition-colors">
                  Browse Files
                </button>
              </div>
            </div>

            {/* File Preview */}
            <AnimatePresence>
              {file && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-6 overflow-hidden">
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {previewUrl ? <img src={previewUrl} className="w-12 h-12 rounded-lg object-cover" alt="Preview" /> : <File className="text-gray-400 w-6 h-6" />}
                      <div className="min-w-0"><p className="text-gray-200 font-medium truncate">{file.name}</p></div>
                    </div>
                    <button onClick={() => setFile(null)} className="text-gray-500 hover:text-red-400 p-2">✕</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleVerify}
              disabled={!file || !documentType}
              className={`w-full py-4 mt-8 rounded-xl font-bold text-lg transition-all duration-300 ${
                file && documentType ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:shadow-yellow-500/20" : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              Start Verification
            </button>
          </motion.div>
        ) : (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
            <Loader2 className="w-24 h-24 text-yellow-500 animate-spin mb-8" />
            <h2 className="text-2xl font-bold text-yellow-500 tracking-wider">ANALYZING DOCUMENT</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadDocument;
