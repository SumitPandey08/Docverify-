import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  Users,
  BarChart,
  Zap,
  Award,
  Lock,
  Code,
  Globe,
  Star,
  Facebook,
  Twitter,
  Github,
  Check,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Fingerprint
} from "lucide-react";

// Feature Data
const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-yellow-500" />,
    title: "AI-Powered Verification",
    desc: "Advanced neural networks analyze every pixel for tampering and inconsistencies.",
  },
  {
    icon: <Zap className="w-10 h-10 text-yellow-500" />,
    title: "Instant Results",
    desc: "Verification in seconds—no more waiting for manual human review processes.",
  },
  {
    icon: <Lock className="w-10 h-10 text-yellow-500" />,
    title: "End-to-End Encryption",
    desc: "Your documents are processed in a secure environment and never stored permanently.",
  },
];

const LandingPage = () => {
  return (
    <div className="relative bg-black text-gray-100 min-h-screen flex flex-col overflow-hidden font-sans selection:bg-yellow-500/30">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-yellow-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <Cpu className="w-4 h-4" />
            <span>Next-Gen AI Verification Engine</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black leading-tight tracking-tight mb-8"
          >
            Verify documents with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-600 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
              absolute certainty.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mb-12 leading-relaxed"
          >
            Stop manual fraud checks. Use our powerful AI agent to validate certificates, 
            IDs, and official documents in real-time with enterprise-grade precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Link
              to="/auth/login"
              className="group px-8 py-4 bg-yellow-500 text-black font-bold rounded-2xl flex items-center gap-2 hover:bg-yellow-400 transition-all shadow-[0_0_30px_rgba(234,179,8,0.2)] hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] transform hover:-translate-y-1"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/auth/signup"
              className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all transform hover:-translate-y-1"
            >
              Create Free Account
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats / Proof Section */}
      <section className="relative py-20 z-10 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Verification Speed", val: "< 2s" },
            { label: "Accuracy Rate", val: "99.9%" },
            { label: "Fraud Detected", val: "500k+" },
            { label: "Active Enterprises", val: "1.2k" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.val}</div>
              <div className="text-gray-500 text-sm font-medium uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative py-32 z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Built for Modern Trust</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our platform combines multiple layers of verification into a single, seamless API and dashboard experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-gray-900/40 border border-white/5 backdrop-blur-md hover:border-yellow-500/30 transition-all"
              >
                <div className="mb-6 inline-block p-4 rounded-2xl bg-yellow-500/10">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-32 z-10 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-yellow-500 to-orange-600 p-12 md:p-20 text-center relative overflow-hidden shadow-[0_0_80px_rgba(234,179,8,0.2)]">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <ShieldCheck className="w-64 h-64 text-black -rotate-12 translate-x-20 translate-y-[-20%]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-black mb-8 relative z-10">
            Ready to secure your business?
          </h2>
          <p className="text-black/80 text-xl font-medium mb-12 max-w-2xl mx-auto relative z-10">
            Join the organizations that trust DocuVerify to eliminate document fraud and streamline onboarding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              to="/auth/signup"
              className="px-10 py-5 bg-black text-white font-black rounded-2xl hover:scale-105 transition-transform shadow-2xl"
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              className="px-10 py-5 bg-white/20 backdrop-blur-md text-black font-black rounded-2xl hover:bg-white/30 transition-all"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 z-10 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <div className="text-2xl font-black text-yellow-500 mb-4">DocuVerify</div>
            <p className="text-gray-500 max-w-xs">
              World-class document verification powered by artificial intelligence.
            </p>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-3">
              <span className="text-white font-bold mb-2">Platform</span>
              <a href="#" className="text-gray-500 hover:text-yellow-500 transition">Features</a>
              <a href="#" className="text-gray-500 hover:text-yellow-500 transition">Security</a>
              <a href="#" className="text-gray-500 hover:text-yellow-500 transition">API</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white font-bold mb-2">Company</span>
              <a href="#" className="text-gray-500 hover:text-yellow-500 transition">About</a>
              <a href="#" className="text-gray-500 hover:text-yellow-500 transition">Terms</a>
              <a href="#" className="text-gray-500 hover:text-yellow-500 transition">Privacy</a>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="#" className="p-3 rounded-xl bg-white/5 hover:bg-yellow-500/10 hover:text-yellow-500 transition"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="p-3 rounded-xl bg-white/5 hover:bg-yellow-500/10 hover:text-yellow-500 transition"><Github className="w-5 h-5" /></a>
            <a href="#" className="p-3 rounded-xl bg-white/5 hover:bg-yellow-500/10 hover:text-yellow-500 transition"><Facebook className="w-5 h-5" /></a>
          </div>
        </div>
        <div className="text-center text-gray-600 text-sm mt-20">
          © {new Date().getFullYear()} DocuVerify Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
