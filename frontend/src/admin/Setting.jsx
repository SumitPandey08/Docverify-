import React, { useState } from "react";

export default function SettingsAdmin() {
  const [threshold, setThreshold] = useState(0.75);
  const [mfa, setMfa] = useState(true);

  return (
    <div>
      <h2 className="text-2xl font-bold text-yellow-500 mb-6">System Settings</h2>

      <div className="bg-gray-900 rounded-xl p-6 shadow max-w-3xl">
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Forgery Confidence Threshold</label>
          <input
            type="range"
            min="0.5"
            max="0.99"
            step="0.01"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-300 mt-2">Current: {(threshold * 100).toFixed(0)}%</div>
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-4">
            <input type="checkbox" checked={mfa} onChange={() => setMfa(!mfa)} className="form-checkbox" />
            <span className="text-gray-300">Require MFA for Admins</span>
          </label>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-yellow-500 text-black rounded">Save</button>
          <button className="px-4 py-2 bg-gray-800 rounded">Reset</button>
        </div>
      </div>
    </div>
  );
}
