import React from "react";

const logs = [
  { time: "2025-09-21 13:12", user: "admin", action: "Promoted bob@example.com to Verifier" },
  { time: "2025-09-20 09:05", user: "verifier1", action: "Manually reviewed doc: Loan_Agreement.pdf" },
  { time: "2025-09-19 18:23", user: "system", action: "Bulk export created: Weekly_Summary.csv" },
];

export default function AuditLogs() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-yellow-500 mb-6">Audit Logs</h2>

      <div className="bg-gray-900 rounded-xl p-6 shadow">
        <ul className="space-y-4">
          {logs.map((l, idx) => (
            <li key={idx} className="flex justify-between items-start border-b border-gray-800 pb-3">
              <div>
                <div className="text-sm text-gray-400">{l.time} • {l.user}</div>
                <div className="mt-1">{l.action}</div>
              </div>
              <div className="text-xs text-gray-500">ID #{1000 + idx}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
