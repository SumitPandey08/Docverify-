import React from "react";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-md ${isActive ? "bg-yellow-500 text-black" : "text-gray-300 hover:bg-gray-900"}`;

export default function AdminSidebar() {
  return (
    <aside className="w-72 border-r border-gray-800 p-6 hidden lg:block">
      <div className="mb-8">
        <h3 className="text-yellow-400 font-bold text-lg">Admin Panel</h3>
        <p className="text-sm text-gray-400 mt-1">Manage users, verifications & system</p>
      </div>

      <nav className="space-y-2">
        <NavLink to="/admin/dashboard" end className={linkClass}>🏠 Overview</NavLink>
        <NavLink to="/admin/users" className={linkClass}>👥 User Management</NavLink>
        <NavLink to="/admin/reports" className={linkClass}>📄 Reports</NavLink>
        <NavLink to="/admin/analytics" className={linkClass}>📊 Analytics</NavLink>
        <NavLink to="/admin/settings" className={linkClass}>⚙️ Settings</NavLink>
        <NavLink to="/admin/logs" className={linkClass}>🔎 Audit Logs</NavLink>
      </nav>

      <div className="mt-8">
        <button className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-md">Create Report</button>
      </div>
    </aside>
  );
}
