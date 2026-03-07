import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Building2, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const OrganizationLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/organizations/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("orgToken", data.token);
        localStorage.setItem("orgId", data.organization._id);
        navigate("/organizationDashboard");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-950/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 md:p-16 w-full max-w-xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-8 group">
            <div className="bg-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Building2 className="w-8 h-8 text-black fill-black" />
            </div>
            <span className="text-white font-black text-2xl tracking-tighter">DocuVerify</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-4">Partner Login</h1>
          <p className="text-gray-500">Access your organization control panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-gray-400 text-sm font-medium ml-1">Organization Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@organization.com"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-sm font-medium ml-1">Secret Key / Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 transition-all"
              />
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-orange-500 text-black font-black py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-orange-400 transition-all disabled:opacity-50 transform hover:-translate-y-0.5"
          >
            {isLoading ? "Authenticating..." : "Login to Control Panel"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            Not a partner yet?{" "}
            <Link to="/auth/organization/signup" className="text-orange-500 font-bold hover:underline">
              Register Organization
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OrganizationLogin;
