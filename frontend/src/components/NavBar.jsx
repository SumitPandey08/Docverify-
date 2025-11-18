import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-semibold"
      : "text-gray-300 hover:text-yellow-400 transition";

  return (
    <nav className="bg-black border-b border-gray-800 px-8 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-yellow-400 font-bold text-2xl">⚡ DocuVerify</span>
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-8 text-lg">
        <li><NavLink to="/userDashboard" className={navLinkClasses}>Home</NavLink></li>
        <li><NavLink to="/upload" className={navLinkClasses}>Upload</NavLink></li>
        <li><NavLink to="/history" className={navLinkClasses}>History</NavLink></li>
        <li><NavLink to="/profile" className={navLinkClasses}>Profile</NavLink></li>
        <li><NavLink to="/about" className={navLinkClasses}>About</NavLink></li>
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-4">
      
        <Link
          to="/"
          className="px-5 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
        >
          Log out
        </Link>
      </div>
    </nav>
  );
}


export default Navbar;
