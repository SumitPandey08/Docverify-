import React from "react";

export default function AdminFooter() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-6 text-center border-t border-gray-800">
      <p>© {new Date().getFullYear()} DocuVerify Admin Panel. All rights reserved.</p>
      <div className="flex justify-center space-x-6 mt-3">
        <a href="#" className="hover:text-yellow-500 transition">Twitter</a>
        <a href="#" className="hover:text-yellow-500 transition">LinkedIn</a>
        <a href="#" className="hover:text-yellow-500 transition">GitHub</a>
      </div>
    </footer>
  );
}
