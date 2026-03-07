import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Key, 
  FileCheck, 
  BarChart, 
  PlusCircle, 
  Download,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Settings,
  ClipboardList,
  User,
  Clock,
  ArrowRight,
  ChevronRight,
  Layout,
  Upload,
  X,
  AlignCenter,
  AlignLeft,
  AlignRight
} from "lucide-react";

const OrganizationDashboard = () => {
  const [data, setData] = useState({
    organization: null,
    stats: { totalVerifications: 0, fraudDetected: 0, activeModels: 0, apiRequests: 0 },
    recentActivity: []
  });
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("overview"); // "overview", "applications", "templates"
  const [loading, setLoading] = useState(true);
  const [showModelModal, setShowModelModal] = useState(false);
  const [isApproving, setIsApproving] = useState(null);

  // Form state for new document model
  const [newModel, setNewModel] = useState({
    name: "",
    validityDays: 365,
    fields: [{ name: "FullName", type: "text", isRequired: true, x: 100, y: 100, align: "left" }],
    modelImage: null
  });

  const orgId = localStorage.getItem("orgId") || "60d5ecb3a32f622858a3c89c";

  const fetchData = async () => {
    try {
      const dashRes = await fetch(`http://localhost:5000/api/organizations/${orgId}/dashboard`);
      if (dashRes.ok) {
        const dashResult = await dashRes.json();
        setData(dashResult);
      }

      const appsRes = await fetch(`http://localhost:5000/api/organizations/${orgId}/applications`);
      if (appsRes.ok) {
        const appsResult = await appsRes.json();
        setApplications(appsResult);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orgId]);

  const handleApprove = async (requestId) => {
    setIsApproving(requestId);
    try {
      const res = await fetch(`http://localhost:5000/api/organizations/applications/${requestId}/approve`, {
        method: "POST"
      });
      if (res.ok) {
        alert("Document approved and generated!");
        fetchData();
      } else {
        const err = await res.json();
        alert("Failed to approve: " + err.error);
      }
    } catch (error) {
      alert("Error approving request");
    } finally {
      setIsApproving(null);
    }
  };

  const [editingModelId, setEditingModelId] = useState(null);

  const handleDelete = async (modelId) => {
    if (!window.confirm("Are you sure you want to delete this template?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/organizations/${orgId}/model/${modelId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        alert("Template deleted!");
        fetchData();
      }
    } catch (error) {
      alert("Error deleting template");
    }
  };

  const handleEdit = (model) => {
    setNewModel({
      name: model.name,
      validityDays: model.validityDays,
      fields: model.fields.map(f => ({
        name: f.name,
        type: f.type,
        isRequired: f.isRequired,
        x: f.position?.x || 0,
        y: f.position?.y || 0,
        align: f.align || "left"
      })),
      modelImage: null
    });
    setEditingModelId(model._id);
    setShowModelModal(true);
  };

  const handleCreateModel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newModel.name);
    formData.append("validityDays", newModel.validityDays);
    formData.append("fields", JSON.stringify(newModel.fields));
    if (newModel.modelImage) {
      formData.append("modelImage", newModel.modelImage);
    }

    try {
      const url = editingModelId 
        ? `http://localhost:5000/api/organizations/${orgId}/model/${editingModelId}`
        : `http://localhost:5000/api/organizations/${orgId}/model`;
      
      const res = await fetch(url, {
        method: editingModelId ? "PUT" : "POST",
        body: formData
      });

      if (res.ok) {
        alert(editingModelId ? "Template updated!" : "Template created!");
        setShowModelModal(false);
        setEditingModelId(null);
        setNewModel({ name: "", validityDays: 365, fields: [{ name: "FullName", type: "text", isRequired: true, x: 100, y: 100, align: "left" }], modelImage: null });
        fetchData();
      }
    } catch (error) {
      alert("Error saving template");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("API Key copied to clipboard!");
  };

  if (loading) return <div className="bg-black min-h-screen flex items-center justify-center text-orange-500">Loading Portal...</div>;

  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-500 p-2 rounded-xl">
                <Building2 className="text-black w-6 h-6" />
              </div>
              <span className="text-orange-500 font-bold tracking-widest uppercase text-xs">Partner Command Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black">{data.organization?.name || "Organization"}</h1>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex bg-gray-900/50 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
            {[
              { id: "overview", label: "Overview", icon: <Layout className="w-4 h-4" /> },
              { id: "applications", label: "Applications", icon: <ClipboardList className="w-4 h-4" /> },
              { id: "templates", label: "Templates", icon: <FileCheck className="w-4 h-4" /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id ? "bg-orange-500 text-black shadow-lg shadow-orange-500/20" : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              {/* API Key Section */}
              <div className="bg-gray-950 border border-white/5 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                    <Key className="text-orange-500 w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Integration API Key</h3>
                    <p className="text-gray-500 text-sm">Automate document issuance and verification via API.</p>
                  </div>
                </div>
                <div className="bg-black/50 border border-white/10 rounded-2xl p-4 flex items-center gap-4 min-w-[300px] justify-between group">
                  <code className="text-orange-400 font-mono text-sm">{data.organization?.apiKey || "sk_****************"}</code>
                  <button onClick={() => copyToClipboard(data.organization?.apiKey)} className="text-gray-500 hover:text-white p-2">
                    <Download className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Verifications", value: data.stats.totalVerifications, icon: <CheckCircle />, color: "text-green-500" },
                  { label: "Fraud Detected", value: data.stats.fraudDetected, icon: <XCircle />, color: "text-red-500" },
                  { label: "Pending Apps", value: applications.filter(a=>a.status==='pending').length, icon: <Clock />, color: "text-yellow-500" },
                  { label: "API Requests", value: data.stats.apiRequests, icon: <BarChart />, color: "text-blue-500" },
                ].map((stat, i) => (
                  <div key={i} className="p-8 rounded-[2rem] bg-gray-950 border border-white/5 group hover:border-orange-500/20 transition-all">
                    <div className={`w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-black mb-1">{stat.value}</div>
                    <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent History Table */}
              <div className="bg-gray-950 rounded-[2.5rem] border border-white/5 overflow-hidden">
                <div className="p-8 flex items-center justify-between border-b border-white/5">
                  <h2 className="text-2xl font-black">Recent Verification Activity</h2>
                  <Link to="#" className="text-orange-500 font-bold text-sm flex items-center gap-1 hover:underline">
                    View Full Audit <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/[0.02] text-gray-500 text-xs font-bold uppercase tracking-widest">
                      <tr>
                        <th className="px-8 py-4">Document</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4">Timestamp</th>
                        <th className="px-8 py-4 text-right">Reference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {data.recentActivity.map((item, i) => (
                        <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                          <td className="px-8 py-6 font-bold">{item.documentType}</td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              item.status === 'verified' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-gray-500 text-sm">{new Date(item.createdAt).toLocaleString()}</td>
                          <td className="px-8 py-6 text-right font-mono text-[10px] text-gray-600">{item._id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <motion.div
              key="applications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-950 rounded-[2.5rem] border border-white/5 overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black mb-1">Incoming Applications</h2>
                  <p className="text-gray-500 text-sm">Users requesting official documents from your institution.</p>
                </div>
                <div className="bg-orange-500/10 text-orange-500 px-4 py-2 rounded-xl text-sm font-bold">
                  {applications.filter(a=>a.status==='pending').length} Pending
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/[0.02] text-gray-500 text-xs font-bold uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-4">Applicant</th>
                      <th className="px-8 py-4">Document Requested</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {applications.map((app, i) => (
                      <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                        <td className="px-8 py-6 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-400" />
                          </div>
                          <div>
                            <div className="font-bold">{app.userId?.fullName || "Anonymous"}</div>
                            <div className="text-[10px] text-gray-500">{app.userId?.email}</div>
                          </div>
                        </td>
                        <td className="px-8 py-6 font-medium text-orange-400">{app.documentModelName}</td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                            app.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          {app.status === 'pending' ? (
                            <button
                              disabled={isApproving === app._id}
                              onClick={() => handleApprove(app._id)}
                              className="px-5 py-2 bg-white text-black text-xs font-black rounded-lg hover:bg-orange-500 transition-colors disabled:opacity-50"
                            >
                              {isApproving === app._id ? "Processing..." : "Approve & Issue"}
                            </button>
                          ) : (
                            <button className="p-2 bg-gray-900 rounded-lg text-gray-400"><Eye className="w-4 h-4" /></button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {applications.length === 0 && (
                <div className="p-32 text-center text-gray-600">
                  <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No document applications received yet.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Templates Tab */}
          {activeTab === "templates" && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center bg-gray-950 p-8 rounded-[2.5rem] border border-white/5">
                <div>
                  <h2 className="text-2xl font-black">Document Templates</h2>
                  <p className="text-gray-500 text-sm">Define your official documents and their visual structures.</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingModelId(null);
                    setNewModel({ name: "", validityDays: 365, fields: [{ name: "FullName", type: "text", isRequired: true, x: 100, y: 100, align: "left" }], modelImage: null });
                    setShowModelModal(true);
                  }}
                  className="flex items-center gap-2 px-8 py-4 bg-orange-500 text-black font-black rounded-2xl hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/20"
                >
                  <PlusCircle className="w-5 h-5" />
                  Create Template
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.organization?.documentModels.map((model, i) => (
                  <div key={i} className="bg-gray-950 rounded-[2.5rem] border border-white/5 p-8 group hover:border-orange-500/30 transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                        <FileCheck className="text-orange-500 w-7 h-7" />
                      </div>
                      <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-black uppercase">Active</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{model.name}</h3>
                    <p className="text-gray-500 text-sm mb-6">{model.fields.length} Verification Fields • {model.validityDays} Days Validity</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(model)}
                        className="flex-grow py-3 bg-gray-900 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors border border-white/5"
                      >Edit Model</button>
                      <button 
                        onClick={() => handleDelete(model._id)}
                        className="p-3 bg-red-500/10 rounded-xl text-red-500 hover:bg-red-500 transition-colors hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CREATE TEMPLATE MODAL */}
      <AnimatePresence>
        {showModelModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-950 border border-white/10 w-full max-w-3xl rounded-[3rem] p-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black">{editingModelId ? "Edit Document" : "Define New Document"}</h2>
                <button onClick={() => setShowModelModal(false)} className="text-gray-500 hover:text-white"><X /></button>
              </div>

              <form onSubmit={handleCreateModel} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-400 ml-1">Basic Information</label>
                  <input 
                    type="text" 
                    placeholder="Document Name (e.g. Graduate Degree)"
                    required
                    className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-orange-500 outline-none"
                    value={newModel.name}
                    onChange={(e) => setNewModel({...newModel, name: e.target.value})}
                  />
                  <input 
                    type="number" 
                    placeholder="Validity in Days"
                    className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-orange-500 outline-none"
                    value={newModel.validityDays}
                    onChange={(e) => setNewModel({...newModel, validityDays: parseInt(e.target.value)})}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1 ml-1">
                    <label className="text-sm font-bold text-gray-400 flex justify-between items-center">
                      Issuance Fields 
                      <button 
                        type="button"
                        onClick={() => setNewModel({...newModel, fields: [...newModel.fields, {name: "", type: "text", isRequired: true, x: 0, y: 0, align: "left"}]})}
                        className="text-orange-500 text-xs hover:underline bg-orange-500/5 px-2 py-1 rounded-lg"
                      >+ Add Field</button>
                    </label>
                    <p className="text-[10px] text-gray-500 leading-tight">
                      X/Y are coordinates. Alignment controls how text grows from that point.
                    </p>
                  </div>
                  
                  {newModel.fields.map((field, idx) => (
                    <div key={idx} className="bg-black/40 border border-white/5 rounded-2xl p-4 space-y-4">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Field Name (e.g. Student Name)"
                          className="flex-grow bg-black border border-white/10 rounded-xl p-3 text-sm"
                          value={field.name}
                          onChange={(e) => {
                            const f = [...newModel.fields];
                            f[idx].name = e.target.value;
                            setNewModel({...newModel, fields: f});
                          }}
                        />
                        <div className="flex bg-black border border-white/10 rounded-xl p-1">
                          {[
                            { id: 'left', icon: <AlignLeft className="w-4 h-4" /> },
                            { id: 'center', icon: <AlignCenter className="w-4 h-4" /> },
                            { id: 'right', icon: <AlignRight className="w-4 h-4" /> }
                          ].map(opt => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                const f = [...newModel.fields];
                                f[idx].align = opt.id;
                                setNewModel({...newModel, fields: f});
                              }}
                              className={`p-2 rounded-lg transition-all ${field.align === opt.id ? "bg-orange-500 text-black" : "text-gray-500 hover:text-white"}`}
                            >
                              {opt.icon}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="flex-grow relative">
                          <span className="absolute -top-2 left-2 px-1 bg-gray-950 text-[8px] text-gray-500 font-bold uppercase tracking-widest">X Coordinate</span>
                          <input 
                            type="number" 
                            className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm"
                            value={field.x}
                            onChange={(e) => {
                              const f = [...newModel.fields];
                              f[idx].x = parseInt(e.target.value) || 0;
                              setNewModel({...newModel, fields: f});
                            }}
                          />
                        </div>
                        <div className="flex-grow relative">
                          <span className="absolute -top-2 left-2 px-1 bg-gray-950 text-[8px] text-gray-500 font-bold uppercase tracking-widest">Y Coordinate</span>
                          <input 
                            type="number" 
                            className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm"
                            value={field.y}
                            onChange={(e) => {
                              const f = [...newModel.fields];
                              f[idx].y = parseInt(e.target.value) || 0;
                              setNewModel({...newModel, fields: f});
                            }}
                          />
                        </div>
                        {newModel.fields.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => {
                              const f = newModel.fields.filter((_, i) => i !== idx);
                              setNewModel({...newModel, fields: f});
                            }}
                            className="p-3 text-gray-600 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-400 ml-1">Template Background Image</label>
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-orange-500 transition-colors cursor-pointer relative">
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => setNewModel({...newModel, modelImage: e.target.files[0]})}
                    />
                    <Upload className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-500 text-xs">{newModel.modelImage ? newModel.modelImage.name : "Select template base image (PNG/JPG)"}</p>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-orange-500 text-black font-black rounded-2xl hover:bg-orange-400 transition-all shadow-xl"
                >{editingModelId ? "Update Template" : "Issuance Blueprint & Save Template"}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrganizationDashboard;
