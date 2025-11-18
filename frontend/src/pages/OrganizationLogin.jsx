import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



const UserLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User login:", { email, password });
    navigate('/userDashboard');
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-950 to-black min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-950 rounded-2xl shadow-2xl p-10 w-full max-w-md text-center border border-yellow-500/20"
      >
        <h1 className="text-4xl font-extrabold text-yellow-400 mb-6">
          User Login
        </h1>
        <p className="text-gray-400 mb-8">
          Welcome back! Please login to access your dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-600 transition"
          >
            Login
          </motion.button>
        </form>

        <p className="text-gray-400 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/auth/signup"
            className="text-yellow-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default UserLogin;
