import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Shield, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("userToken", data.token);
        navigate('/userDashboard');
      } else {
        alert("Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error logging in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-950/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 md:p-16 w-full max-w-xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="bg-yellow-500 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Shield className="w-8 h-8 text-black fill-black" />
            </div>
            <span className="text-white font-black text-2xl tracking-tighter">DocuVerify</span>
          </Link>
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500">Secure access to your verification dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-gray-400 text-sm font-medium ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sumit@example.com"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-gray-400 text-sm font-medium">Password</label>
              <a href="#" className="text-yellow-500 text-xs hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500/50 transition-all"
              />
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-yellow-500 text-black font-black py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/10 transform hover:-translate-y-0.5"
          >
            {isLoading ? "Signing In..." : "Sign In to Dashboard"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-yellow-500 font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UserLogin;
