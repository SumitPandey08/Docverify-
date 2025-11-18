import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const barData = [
  { name: "Week 1", docs: 1200, users: 320 },
  { name: "Week 2", docs: 1500, users: 410 },
  { name: "Week 3", docs: 1700, users: 480 },
  { name: "Week 4", docs: 1900, users: 520 },
];

export default function Analytics() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-yellow-500 mb-6">Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 shadow">
          <h3 className="text-gray-300 mb-4">Documents vs Users (Monthly)</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid stroke="#2b2b2b" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Legend />
                <Bar dataKey="docs" fill="#facc15" />
                <Bar dataKey="users" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow">
          <h3 className="text-gray-300 mb-4">Key Ratios</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-800 rounded p-4">
              <p className="text-sm text-gray-400">Authentic vs Forged</p>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-yellow-500">82% Authentic</div>
                <div className="text-sm text-gray-400">Forged: 18%</div>
              </div>
            </div>
            <div className="bg-gray-800 rounded p-4">
              <p className="text-sm text-gray-400">Manual Review Rate</p>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-yellow-500">6.2%</div>
                <div className="text-sm text-gray-400">of all docs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
