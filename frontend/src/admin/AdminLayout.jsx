import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { motion } from "framer-motion";

export default function AdminLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* topbar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-yellow-400 font-bold text-2xl">⚡ DocuVerify</Link>
          <nav className="hidden lg:flex gap-6 text-gray-300">
            <Link to="/admin" className={location.pathname === "/admin" ? "text-yellow-400" : ""}>Admin</Link>
            <Link to="/admin/analytics">Analytics</Link>
            <Link to="/admin/reports">Reports</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <input className="hidden md:block bg-gray-900 rounded-md px-3 py-2 text-gray-300 focus:outline-none" placeholder="Search users, docs..." />
          <button className="hidden md:inline px-3 py-2 rounded-md bg-gray-900">🔔</button>
          <div className="w-10 h-10 rounded-full bg-gray-800 ring-2 ring-yellow-500 overflow-hidden">
            {/* placeholder avatar */}
            <img alt="admin" src={`https://i.pravatar.cc/100?img=12`} className="w-full h-full object-cover"/>
          </div>
        </div>
      </div>

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
