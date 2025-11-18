import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { Link , useNavigate} from "react-router-dom";


const UserSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

//signup api call to be added here
let signupUrl = "http://localhost:5000/api/users/register";
let Signup = async () => {
    let response = await fetch(signupUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.name,
            email: form.email,
            password: form.password
        })
    });
    let data = await response.json();
    console.log(data);
  
}  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User signup:", form);
    Signup() ;
    navigate('/auth/login');
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
          User Signup
        </h1>
        <p className="text-gray-400 mb-8">
          Create your account and start verifying documents securely.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {/* Name */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
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
            Sign Up
          </motion.button>
        </form>

        <p className="text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-yellow-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default UserSignup;
