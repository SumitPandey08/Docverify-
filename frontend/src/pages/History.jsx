import React from "react";

const History = () => {
  const historyData = [
    { id: 1, filename: "Certificate_A.pdf", status: "Authentic", date: "2025-09-20" },
    { id: 2, filename: "Certificate_B.jpg", status: "Forged", date: "2025-09-18" },
    { id: 3, filename: "Transcript.pdf", status: "Authentic", date: "2025-09-15" },
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center py-12 px-6 font-sans">
      <h1 className="text-4xl font-extrabold text-yellow-500 mb-10 animate-fade-in">
        Verification History
      </h1>

      <div className="w-full max-w-4xl bg-gray-950 rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-900 text-yellow-500">
            <tr>
              <th className="px-6 py-4">File</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item, index) => (
              <tr
                key={item.id}
                className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"} hover:bg-gray-700 transition`}
              >
                <td className="px-6 py-4">{item.filename}</td>
                <td
                  className={`px-6 py-4 font-bold ${
                    item.status === "Authentic" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item.status}
                </td>
                <td className="px-6 py-4 text-gray-400">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
