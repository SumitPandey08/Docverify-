import { Shield, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-yellow-500 p-1 rounded-md">
                <Shield className="w-5 h-5 text-black fill-black" />
              </div>
              <span className="text-white font-black text-lg tracking-tighter">DocuVerify</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Empowering organizations with next-generation AI to eliminate document fraud and build digital trust.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/upload" className="hover:text-yellow-500 transition-colors">Verify Tool</Link></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">AI Intelligence</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Enterprise</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-4">Get the latest on AI security and document trust.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors flex-grow"
              />
              <button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-xl hover:bg-yellow-400 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} DocuVerify Inc. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-gray-600">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
