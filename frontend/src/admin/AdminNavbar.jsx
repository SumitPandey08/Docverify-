import React from "react";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav className="bg-gray-950 shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <Link to="/admin/dashboard" className="text-yellow-400 font-extrabold text-2xl">⚡ DocuVerify</Link>
        <div className="hidden md:flex gap-4 text-gray-300">
          <Link to="/admin/analytics" className="hover:text-yellow-400 transition">Analytics</Link>
          <Link to="/admin/reports" className="hover:text-yellow-400 transition">Reports</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <input className="hidden md:block bg-gray-900 rounded-md px-3 py-2 text-gray-300 focus:outline-none" placeholder="Search users, docs..." />
        <button className="hidden md:inline px-3 py-2 rounded-md bg-gray-900">🔔</button>
        <div className="w-10 h-10 rounded-full bg-gray-800 ring-2 ring-yellow-500 overflow-hidden">
          <img alt="admin" src={`https://i.pravatar.cc/100?img=12`} className="w-full h-full object-cover"/>
        </div>
      </div>
    </nav>
  );
}
