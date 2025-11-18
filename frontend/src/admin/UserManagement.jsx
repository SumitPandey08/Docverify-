import React, { useState } from "react";
import { motion } from "framer-motion";

const initialUsers = [
  { id: 1, name: "Alice Smith", email: "alice@example.com", role: "User", status: "Active" },
  { id: 2, name: "Bob Johnson", email: "bob@example.com", role: "Verifier", status: "Active" },
  { id: 3, name: "Charlie Lee", email: "charlie@example.com", role: "User", status: "Suspended" },
];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);

  const toggleSuspend = (id) => {
    setUsers((prev) => prev.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u));
  };

  const promote = (id) => {
    setUsers((prev) => prev.map(u => u.id === id ? { ...u, role: u.role === "User" ? "Verifier" : "User" } : u));
  };

  return (
    <div>
      <motion.h2 className="text-2xl font-bold text-yellow-500 mb-6" initial={{opacity:0}} animate={{opacity:1}}>User Management</motion.h2>

      <div className="bg-gray-900 rounded-xl p-6 shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">All Users</h3>
            <p className="text-sm text-gray-400">Manage roles and statuses</p>
          </div>

          <div className="flex gap-2">
            <button className="px-3 py-2 rounded bg-gray-800">Invite</button>
            <button className="px-3 py-2 rounded bg-yellow-500 text-black">Create User</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-400 text-sm">
              <tr>
                <th className="py-3">Name</th>
                <th className="py-3">Email</th>
                <th className="py-3">Role</th>
                <th className="py-3">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t border-gray-800">
                  <td className="py-3">{u.name}</td>
                  <td className="py-3 text-gray-400">{u.email}</td>
                  <td className="py-3">{u.role}</td>
                  <td className="py-3">{u.status}</td>
                  <td className="py-3 flex gap-2">
                    <button onClick={() => toggleSuspend(u.id)} className="px-2 py-1 rounded bg-gray-800 text-sm">Toggle Suspend</button>
                    <button onClick={() => promote(u.id)} className="px-2 py-1 rounded bg-yellow-500 text-black text-sm">Promote</button>
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
