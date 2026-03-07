import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Building2, ArrowRight, Shield } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const OrganizationSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/organizations/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Organization registered successfully! Please login.");
        navigate("/auth/organization/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-950/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 md:p-16 w-full max-w-xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-8 group">
            <div className="bg-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Building2 className="w-8 h-8 text-black fill-black" />
            </div>
            <span className="text-white font-black text-2xl tracking-tighter">DocuVerify</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-4">Partner with Us</h1>
          <p className="text-gray-500">Register your organization to start verifying</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-gray-400 text-sm font-medium ml-1">Organization Name</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Tech University / Global Corp"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-sm font-medium ml-1">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@organization.com"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-sm font-medium ml-1">Set Secret Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 transition-all"
              />
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-orange-500 text-black font-black py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-orange-400 transition-all disabled:opacity-50 transform hover:-translate-y-0.5 mt-4"
          >
            {isLoading ? "Creating Profile..." : "Register Organization"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            Already registered?{" "}
            <Link to="/auth/organization/login" className="text-orange-500 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OrganizationSignup;
