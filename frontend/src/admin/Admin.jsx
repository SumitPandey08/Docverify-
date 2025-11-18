import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import Reports from './Report';
import Analytics from './Analytics';
import SettingsAdmin from './Setting';
import AuditLogs from "./AuditLogs";
import AdminFooter from './AdminFooter';

const Admin = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<SettingsAdmin />} />
          <Route path="logs" element={<AuditLogs />} />
        </Route>
      </Routes>
      <AdminFooter />
    </div>
  );
};

export default Admin;