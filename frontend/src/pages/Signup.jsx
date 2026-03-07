import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Shield, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const UserSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          organizationId: "60d5ecb3a32f622858a3c89c" // Hardcoded org for demo signup
        }),
      });

      if (response.ok) {
        alert("Account created! Please login.");
        navigate('/auth/login');
      } else {
        alert("Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-950/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 md:p-16 w-full max-w-xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="bg-yellow-500 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Shield className="w-8 h-8 text-black fill-black" />
            </div>
            <span className="text-white font-black text-2xl tracking-tighter">DocuVerify</span>
          </Link>
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Join DocuVerify</h1>
          <p className="text-gray-500">Start verifying with the world's most accurate AI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-gray-400 text-sm font-medium ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-sm font-medium ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="sumit@example.com"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-gray-400 text-sm font-medium ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500/50 transition-all text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-gray-400 text-sm font-medium ml-1">Confirm</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500/50 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-yellow-500 text-black font-black py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/10 transform hover:-translate-y-0.5 mt-4 disabled:opacity-50"
          >
            {isLoading ? "Creating Profile..." : "Create Your Account"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            Already a member?{" "}
            <Link to="/auth/login" className="text-yellow-500 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UserSignup;
