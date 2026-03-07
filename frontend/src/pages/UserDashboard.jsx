import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  ShieldCheck, 
  History, 
  ArrowRight, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Clock,
  PlusCircle,
  Download,
  Building2,
  ChevronRight,
  Search,
  X,
  Layout,
  ClipboardList,
  FileCheck,
  Eye
} from "lucide-react";

const UserDashboard = () => {
  const [data, setData] = useState({
    user: null,
    stats: { verified: 0, rejected: 0, pending: 0, issued: 0, total: 0 },
    recentActivity: [],
    applications: []
  });
  const [organizations, setOrganizations] = useState([]);
  const [activeTab, setActiveTab] = useState("overview"); // overview, applications, issued
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  
  // Application Form State
  const [applyForm, setApplyForm] = useState({
    organizationId: "",
    documentModelName: "",
    formData: {}
  });

  const userId = localStorage.getItem("userId") || "60d5ecb3a32f622858a3c89d";

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/dashboard`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }

      const orgsRes = await fetch(`http://localhost:5000/api/users/organizations`);
      if (orgsRes.ok) {
        const orgsData = await orgsRes.json();
        setOrganizations(orgsData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/documents/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          organizationId: applyForm.organizationId,
          documentModelName: applyForm.documentModelName,
          formData: applyForm.formData
        })
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        setShowApplyModal(false);
        fetchData();
      }
    } catch (error) {
      alert("Error submitting application");
    }
  };

  const stats = [
    { label: "Verified", value: data.stats.verified, icon: <CheckCircle className="text-green-500" />, bg: "bg-green-500/10" },
    { label: "Rejected", value: data.stats.rejected, icon: <AlertCircle className="text-red-500" />, bg: "bg-red-500/10" },
    { label: "Issued Docs", value: data.stats.issued, icon: <FileCheck className="text-orange-500" />, bg: "bg-orange-500/10" },
    { label: "Total Checks", value: data.stats.total, icon: <ShieldCheck className="text-blue-500" />, bg: "bg-blue-500/10" },
  ];

  if (loading) return <div className="bg-black min-h-screen flex items-center justify-center text-yellow-500 font-black tracking-widest animate-pulse">SYNCHRONIZING...</div>;

  const selectedOrg = organizations.find(o => o._id === applyForm.organizationId);
  const selectedModel = selectedOrg?.documentModels.find(m => m.name === applyForm.documentModelName);

  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Welcome Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Welcome back, {data.user?.fullName || "User"}</h1>
            <p className="text-gray-500 text-lg">Your personal trust and verification vault.</p>
          </motion.div>
          
          <div className="flex gap-4">
            <button
              onClick={() => setShowApplyModal(true)}
              className="flex items-center gap-2 px-6 py-4 bg-gray-900 border border-white/10 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all"
            >
              <PlusCircle className="w-5 h-5 text-yellow-500" />
              Apply for Document
            </button>
            <Link
              to="/upload"
              className="flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black font-black rounded-2xl hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/10 transform hover:-translate-y-1"
            >
              <Upload className="w-5 h-5" />
              Verify Document
            </Link>
          </div>
        </div>

        {/* Custom Navigation */}
        <div className="flex bg-gray-900/50 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md mb-12 w-fit">
          {[
            { id: "overview", label: "Overview", icon: <Layout className="w-4 h-4" /> },
            { id: "applications", label: "My Applications", icon: <ClipboardList className="w-4 h-4" /> },
            { id: "issued", label: "Issued Documents", icon: <FileCheck className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20" : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-[2rem] bg-gray-950 border border-white/5 group hover:border-yellow-500/20 transition-all"
                  >
                    <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-black mb-1">{stat.value}</div>
                    <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-gray-950 rounded-[2.5rem] p-8 border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-black flex items-center gap-3">
                        <History className="text-yellow-500" />
                        Recent Verifications
                      </h2>
                      <Link to="/history" className="text-yellow-500 text-sm font-bold hover:underline">View All History</Link>
                    </div>

                    <div className="space-y-4">
                      {data.recentActivity.length > 0 ? data.recentActivity.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <FileText className="text-gray-500" />
                            </div>
                            <div>
                              <div className="font-bold text-white">{item.documentType}</div>
                              <div className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()} • Ref: {item._id.slice(-6)}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              item.status === 'verified' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                            }`}>
                              {item.status}
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-yellow-500 transition-colors" />
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-12 text-gray-600 italic">No verification records found.</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-[2.5rem] p-8 text-black shadow-2xl">
                    <ShieldCheck className="w-12 h-12 mb-6" />
                    <h3 className="text-2xl font-black mb-4 leading-tight">Your Digital Identity is Protected.</h3>
                    <p className="font-medium opacity-80 mb-8 leading-relaxed">
                      Our AI-driven verification ensures your documents are authentic and tamper-proof across the network.
                    </p>
                    <button className="w-full py-4 bg-black text-white font-black rounded-2xl hover:bg-gray-900 transition-colors">
                      Security Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "applications" && (
            <motion.div key="applications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-gray-950 rounded-[2.5rem] border border-white/5 overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-2xl font-black">My Document Applications</h2>
                <div className="text-yellow-500 text-sm font-bold">{data.applications.length} Total Requests</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/[0.02] text-gray-500 text-xs font-bold uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-4">Organization</th>
                      <th className="px-8 py-4">Document Type</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4">Date Applied</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {data.applications.map((app, i) => (
                      <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                        <td className="px-8 py-6 flex items-center gap-3">
                          <Building2 className="w-4 h-4 text-gray-500" />
                          <span className="font-bold">{app.organizationId?.name}</span>
                        </td>
                        <td className="px-8 py-6 font-medium text-yellow-500/80">{app.documentModelName}</td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                            app.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                            app.status === 'created' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-gray-500 text-sm">{new Date(app.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {data.applications.length === 0 && (
                <div className="p-32 text-center text-gray-600">No applications found. Apply for a document to get started!</div>
              )}
            </motion.div>
          )}

          {activeTab === "issued" && (
            <motion.div key="issued" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.applications.filter(a => a.status === 'created').map((doc, i) => (
                <div key={i} className="bg-gray-950 rounded-[2.5rem] border border-white/5 p-8 group hover:border-yellow-500/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 blur-2xl rounded-full"></div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center">
                      <FileCheck className="text-green-500 w-7 h-7" />
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all"><Download className="w-5 h-5" /></button>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{doc.documentModelName}</h3>
                  <p className="text-gray-500 text-xs mb-6">Issued by {doc.organizationId?.name}</p>
                  <a 
                    href={`http://localhost:5000/${doc.generatedDocumentPath}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-4 bg-gray-900 rounded-2xl text-sm font-black flex items-center justify-center gap-2 hover:bg-gray-800 transition-all border border-white/5"
                  >
                    <Eye className="w-4 h-4" />
                    View Original
                  </a>
                </div>
              ))}
              {data.applications.filter(a => a.status === 'created').length === 0 && (
                <div className="col-span-full p-32 text-center text-gray-600 bg-gray-950 rounded-[3rem] border border-white/5 border-dashed">
                  No issued documents yet.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* APPLY MODAL */}
      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-gray-950 border border-white/10 w-full max-w-xl rounded-[3rem] p-10 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black">Request Document</h2>
                <button onClick={() => setShowApplyModal(false)} className="text-gray-500 hover:text-white"><X /></button>
              </div>

              <form onSubmit={handleApply} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Select Institution</label>
                  <select 
                    required
                    className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500 outline-none transition-all appearance-none cursor-pointer"
                    value={applyForm.organizationId}
                    onChange={(e) => setApplyForm({...applyForm, organizationId: e.target.value, documentModelName: ""})}
                  >
                    <option value="">Choose an organization...</option>
                    {organizations.map(org => <option key={org._id} value={org._id}>{org.name}</option>)}
                  </select>
                </div>

                {applyForm.organizationId && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Document Template</label>
                    <select 
                      required
                      className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500 outline-none appearance-none cursor-pointer"
                      value={applyForm.documentModelName}
                      onChange={(e) => setApplyForm({...applyForm, documentModelName: e.target.value})}
                    >
                      <option value="">Select a template...</option>
                      {selectedOrg?.documentModels.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                    </select>
                  </motion.div>
                )}

                {selectedModel && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-4 border-t border-white/5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Required Information</label>
                    {selectedModel.fields.map(field => (
                      <input 
                        key={field.name}
                        type={field.type === 'date' ? 'date' : 'text'}
                        placeholder={field.name}
                        required={field.isRequired}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-4 text-sm text-white focus:border-yellow-500 outline-none"
                        onChange={(e) => setApplyForm({
                          ...applyForm, 
                          formData: { ...applyForm.formData, [field.name]: e.target.value }
                        })}
                      />
                    ))}
                  </motion.div>
                )}

                <button 
                  type="submit"
                  disabled={!applyForm.documentModelName}
                  className="w-full py-5 bg-yellow-500 text-black font-black rounded-2xl hover:bg-yellow-400 transition-all shadow-xl disabled:opacity-20"
                >Submit Official Application</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDashboard;
