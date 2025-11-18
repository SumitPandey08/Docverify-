function Footer() {
  return (
   <footer className="bg-black text-gray-400 py-12 px-8 mt-16 border-t border-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + tagline */}
        <div>
          <h2 className="text-yellow-400 font-bold text-xl mb-3">⚡ DocuVerify</h2>
          <p className="text-sm leading-relaxed">
            Secure, reliable, and verifiable document authentication. <br />
            Building trust one document at a time.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/upload" className="hover:text-yellow-400">Upload Document</a></li>
            <li><a href="/report" className="hover:text-yellow-400">Reports</a></li>
            <li><a href="/forged" className="hover:text-yellow-400">Alerts</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-yellow-400">🐦 Twitter</a>
            <a href="#" className="hover:text-yellow-400">💼 LinkedIn</a>
            <a href="#" className="hover:text-yellow-400">📘 Facebook</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} DocuVerify. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
