import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const lineData = [
  { label: "Mon", v: 120 }, { label: "Tue", v: 200 },
  { label: "Wed", v: 150 }, { label: "Thu", v: 240 },
  { label: "Fri", v: 300 }, { label: "Sat", v: 380 },
  { label: "Sun", v: 320 },
];

const pieData = [
  { name: "Authentic", value: 82 },
  { name: "Forged", value: 18 },
];
const COLORS = ["#22c55e", "#ef4444"];

export default function AdminDashboard() {
  return (
    <div>
      <motion.h1 className="text-3xl font-extrabold text-yellow-500 mb-6" initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        Admin Overview
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div className="bg-gray-900 rounded-xl p-6 shadow" whileHover={{ scale: 1.03 }}>
          <p className="text-sm text-gray-400">Total Users</p>
          <p className="text-2xl font-bold text-yellow-500">5,432</p>
          <p className="text-xs text-gray-500 mt-2">+2.4% last 7d</p>
        </motion.div>

        <motion.div className="bg-gray-900 rounded-xl p-6 shadow" whileHover={{ scale: 1.03 }}>
          <p className="text-sm text-gray-400">Total Documents</p>
          <p className="text-2xl font-bold text-yellow-500">45,201</p>
          <p className="text-xs text-gray-500 mt-2">+8.9% last month</p>
        </motion.div>

        <motion.div className="bg-gray-900 rounded-xl p-6 shadow" whileHover={{ scale: 1.03 }}>
          <p className="text-sm text-gray-400">Pending Reviews</p>
          <p className="text-2xl font-bold text-yellow-500">132</p>
          <p className="text-xs text-gray-500 mt-2">Needs manual review</p>
        </motion.div>

        <motion.div className="bg-gray-900 rounded-xl p-6 shadow" whileHover={{ scale: 1.03 }}>
          <p className="text-sm text-gray-400">Success Rate</p>
          <p className="text-2xl font-bold text-yellow-500">97.3%</p>
          <p className="text-xs text-gray-500 mt-2">Forged 2.7%</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-900 p-6 rounded-xl shadow">
          <h4 className="text-gray-300 mb-4">Verifications (last 7 days)</h4>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid stroke="#2b2b2b" />
                <XAxis dataKey="label" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke="#facc15" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow">
          <h4 className="text-gray-300 mb-4">Authentic vs Forged</h4>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={90} paddingAngle={3} label>
                  {pieData.map((entry, idx) => <Cell key={idx} fill={COLORS[idx]} />)}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 shadow">
        <h4 className="text-gray-300 mb-4">Recent Verifications</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-400 text-sm">
              <tr>
                <th className="py-3">Document</th>
                <th className="py-3">User</th>
                <th className="py-3">Status</th>
                <th className="py-3">Date</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Birth Certificate.pdf", user: "alice@example.com", status: "Verified", date: "2025-07-28" },
                { name: "Loan_Agreement.pdf", user: "bob@example.com", status: "Failed", date: "2025-07-26" },
                { name: "Passport_Scan.jpg", user: "charlie@example.com", status: "Verified", date: "2025-07-25" },
              ].map((r, i) => (
                <tr key={i} className="border-t border-gray-800">
                  <td className="py-3">{r.name}</td>
                  <td className="py-3 text-gray-400">{r.user}</td>
                  <td className="py-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${r.status === "Verified" ? "bg-yellow-500 text-black" : "bg-red-600 text-white"}`}>{r.status}</span>
                  </td>
                  <td className="py-3 text-gray-400">{r.date}</td>
                  <td className="py-3">
                    <button className="text-sm text-yellow-400 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
