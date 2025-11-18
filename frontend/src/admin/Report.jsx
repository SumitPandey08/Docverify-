import React from "react";

const sampleReports = [
  { id: 1, name: "Weekly Summary", created: "2025-09-01", rows: 1240 },
  { id: 2, name: "Forged Report", created: "2025-08-20", rows: 84 },
  { id: 3, name: "User Activity", created: "2025-07-10", rows: 5432 },
];

export default function Reports() {
  const downloadCSV = (r) => {
    const blob = new Blob([`Report: ${r.name}\nRows: ${r.rows}`], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${r.name.replace(/\s/g, "_")}.csv`;
    a.click();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-yellow-500 mb-6">Reports</h2>

      <div className="grid gap-6">
        {sampleReports.map((r) => (
          <div key={r.id} className="bg-gray-900 rounded-xl p-5 flex items-center justify-between shadow">
            <div>
              <h3 className="text-lg">{r.name}</h3>
              <p className="text-sm text-gray-400">Created: {r.created} • Rows: {r.rows}</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded bg-gray-800">View</button>
              <button onClick={() => downloadCSV(r)} className="px-4 py-2 rounded bg-yellow-500 text-black">Export CSV</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
