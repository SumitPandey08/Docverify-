import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    `relative px-3 py-2 transition-colors ${
      isActive ? "text-yellow-500 font-bold" : "text-gray-400 hover:text-white"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/50 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-yellow-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Shield className="w-6 h-6 text-black fill-black" />
          </div>
          <span className="text-white font-black text-xl tracking-tighter">DocuVerify</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/userDashboard" className={navLinkClasses}>Dashboard</NavLink>
          <NavLink to="/upload" className={navLinkClasses}>Verify</NavLink>
          <NavLink to="/history" className={navLinkClasses}>History</NavLink>
          <NavLink to="/profile" className={navLinkClasses}>Profile</NavLink>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/auth/login"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black border-b border-white/10 px-6 py-8 flex flex-col gap-6"
        >
          <NavLink to="/userDashboard" onClick={() => setIsOpen(false)} className="text-xl font-bold text-white">Dashboard</NavLink>
          <NavLink to="/upload" onClick={() => setIsOpen(false)} className="text-xl font-bold text-white">Verify</NavLink>
          <NavLink to="/history" onClick={() => setIsOpen(false)} className="text-xl font-bold text-white">History</NavLink>
          <NavLink to="/profile" onClick={() => setIsOpen(false)} className="text-xl font-bold text-white">Profile</NavLink>
          <hr className="border-white/5" />
          <Link to="/auth/login" className="text-xl font-bold text-yellow-500 flex items-center gap-2">
            <LogOut /> Logout
          </Link>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;
