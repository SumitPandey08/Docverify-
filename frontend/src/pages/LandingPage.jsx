import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  Users,
  BarChart,
  Zap,
  Award,
  UploadCloud,
  FileCheck,
  ClipboardCheck,
  Lock,
  Code,
  Globe,
  Star,
  Facebook,
  Twitter,
  Github,
  Check,
} from "lucide-react";

// Feature Data
const features = [
  {
    icon: <Shield className="w-8 h-8 text-yellow-400" />,
    title: "Secure Access",
    desc: "Military-grade encryption ensures every document is tamper-proof.",
  },
  {
    icon: <Users className="w-8 h-8 text-yellow-400" />,
    title: "User Friendly",
    desc: "Smooth, modern, and intuitive experience for everyone.",
  },
  {
    icon: <BarChart className="w-8 h-8 text-yellow-400" />,
    title: "Analytics",
    desc: "Get real-time insights and reporting for smarter decisions.",
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: "Lightning Fast",
    desc: "Verification in seconds — speed and reliability combined.",
  },
  {
    icon: <Award className="w-8 h-8 text-yellow-400" />,
    title: "Trusted",
    desc: "Used by enterprises, universities, and global partners.",
  },
];

// Testimonial Data
const testimonials = [
  {
    quote:
      "DocuVerify has completely streamlined our onboarding process. It's fast, reliable, and incredibly secure. A game-changer!",
    name: "Jane Doe, CEO",
    company: "InnovateCorp",
  },
  {
    quote:
      "We've seen a massive reduction in fraud. The real-time analytics are a bonus, helping us make smarter decisions.",
    name: "John Smith, Head of Operations",
    company: "Global Solutions",
  },
  {
    quote:
      "The API was easy to integrate, and the support team was fantastic. It's the perfect solution for our verification needs.",
    name: "Emily White, CTO",
    company: "TechStars",
  },
];

const LandingPage = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#060810] via-[#101424] to-[#060810] text-gray-50 min-h-screen flex flex-col overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px] absolute -top-40 -left-40 animate-pulse-slow"></div>
        <div className="w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] absolute bottom-0 right-0 animate-pulse-slow delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      </div>

      {/* Navbar */}
      <header className="relative flex justify-between items-center px-6 md:px-12 py-6 z-20 backdrop-blur-sm bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-[0_0_10px_#facc15]">
              DocuVerify
            </span>
          </Link>
        </motion.div>

        <nav className="space-x-6 hidden md:flex text-gray-300 font-medium">
          <a href="#features" className="hover:text-yellow-400 transition">
            Features
          </a>
          <a href="#benefits" className="hover:text-yellow-400 transition">
            Benefits
          </a>
          <a href="#pricing" className="hover:text-yellow-400 transition">
            Pricing
          </a>
          <a href="#testimonials" className="hover:text-yellow-400 transition">
            Testimonials
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center px-6 mt-20 md:mt-32 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter drop-shadow-lg text-gray-50 max-w-5xl"
        >
          Verify Smarter,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-[0_0_15px_#facc15]">
            Trust Faster
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-base md:text-lg text-gray-400 max-w-2xl"
        >
          DocuVerify is your all-in-one platform for{" "}
          <span className="text-yellow-300 font-semibold">
            secure document verification
          </span>
          ,{" "}
          <span className="text-yellow-300 font-semibold">
            real-time analytics
          </span>
          , and{" "}
          <span className="text-yellow-300 font-semibold">
            enterprise control
          </span>
          .
        </motion.p>

        <motion.div
          id="auth"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-4 mt-12 flex-wrap justify-center"
        >
          <Link
            to="/auth/login"
            className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-br from-yellow-500 to-orange-600 text-black font-semibold rounded-full shadow-lg hover:shadow-yellow-500/30 transition transform hover:-translate-y-1"
          >
            User Login
          </Link>
          <Link
            to="/auth/signup"
            className="px-6 py-3 md:px-8 md:py-4 bg-transparent border-2 border-yellow-500 text-yellow-400 font-semibold rounded-full hover:bg-yellow-500 hover:text-black transition transform hover:-translate-y-1"
          >
            User Signup
          </Link>
          <Link
            to="/auth/admin/login"
            className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-br from-red-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-red-500/30 transition transform hover:-translate-y-1"
          >
            Admin Login
          </Link>
        </motion.div>
      </section>

      {/* --- */}

      {/* Features Section */}
      <section
        id="features"
        className="relative px-6 md:px-12 mt-24 z-10 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-12 drop-shadow-[0_0_10px_#facc15]">
          Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-sm bg-gray-900/50 p-8 rounded-xl shadow-lg border border-yellow-400/20 hover:border-yellow-400/50 transition"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- */}

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="relative px-6 md:px-12 mt-24 z-10 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-12 drop-shadow-[0_0_10px_#facc15]">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="backdrop-blur-sm bg-gray-900/50 p-8 rounded-xl shadow-lg border border-gray-700/50"
            >
              <Star className="w-5 h-5 text-yellow-400 mb-4" />
              <p className="text-gray-300 italic mb-4">"{t.quote}"</p>
              <div className="text-gray-400 font-semibold">{t.name}</div>
              <div className="text-sm text-gray-500">{t.company}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- */}

      {/* Key Benefits Section */}
      <section
        id="benefits"
        className="relative px-6 md:px-12 mt-24 z-10 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-12 drop-shadow-[0_0_10px_#facc15]">
          Key Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm bg-gray-900/50 p-8 rounded-xl shadow-lg border border-yellow-400/20"
          >
            <Lock className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">
              Enterprise-Grade Security
            </h3>
            <p className="text-gray-400">
              Built with security as a priority, our platform protects your data
              with the highest industry standards.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm bg-gray-900/50 p-8 rounded-xl shadow-lg border border-yellow-400/20"
          >
            <Code className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">
              Seamless API Integration
            </h3>
            <p className="text-gray-400">
              Easily integrate our powerful verification engine into your
              existing systems with our comprehensive API.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm bg-gray-900/50 p-8 rounded-xl shadow-lg border border-yellow-400/20"
          >
            <Globe className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Global Document Support</h3>
            <p className="text-gray-400">
              Verify documents from around the world with our platform's
              extensive support for various formats and regions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- */}

      {/* Pricing Section */}
      <section
        id="pricing"
        className="relative px-6 md:px-12 mt-24 z-10 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-12 drop-shadow-[0_0_10px_#facc15]">
          Simple & Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm bg-gray-900/50 p-8 rounded-xl shadow-lg border border-gray-700/50 flex flex-col items-center"
          >
            <h3 className="text-2xl font-bold mb-2">Basic</h3>
            <p className="text-gray-400 text-sm mb-4">
              Perfect for individuals
            </p>
            <div className="text-4xl font-bold text-yellow-400 mb-6">
              $99<span className="text-lg text-gray-500">/mo</span>
            </div>
            <ul className="text-left text-gray-400 space-y-2 mb-6 w-full">
              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" /> 100 verifications
                per month
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" /> Standard API access
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" /> Basic analytics
                dashboard
              </li>
            </ul>
            <Link
              to="/auth/user/signup"
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg hover:shadow-yellow-500/40 transition hover:scale-105"
            >
              Choose Plan
            </Link>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm bg-gray-900/50 p-8 rounded-xl shadow-lg border-2 border-yellow-500 flex flex-col items-center relative scale-105"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold">
              Popular
            </span>
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-gray-400 text-sm mb-4">For growing businesses</p>
            <div className="text-4xl font-bold text-yellow-400 mb-6">
              $299<span className="text-lg text-gray-500">/mo</span>
            </div>
            <ul className="text-left text-gray-400 space-y-2 mb-6 w-full">
              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" /> 500 verifications
                per month
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" /> Advanced API access
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" /> Real-time analytics
                dashboard
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" /> Priority support
              </li>
            </ul>
            <Link
              to="/auth/user/signup"
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg hover:shadow-yellow-500/40 transition hover:scale-105"
            >
              Choose Plan
            </Link>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm bg-gray-900/50 p-8 rounded-xl shadow-lg border border-gray-700/50 flex flex-col items-center"
          >
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <p className="text-gray-400 text-sm mb-4">
              Custom solutions for large teams
            </p>
            <div className="text-4xl font-bold text-yellow-400 mb-6">
              Custom
            </div>
            <ul className="text-left text-gray-400 space-y-2 mb-6 w-full">
              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" /> Unlimited
                verifications
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" /> Dedicated account
                manager
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" /> Full API access
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" /> 24/7 technical
                support
              </li>
            </ul>
            <Link
              to="/contact"
              className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-red-500/40 transition hover:scale-105"
            >
              Contact Sales
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- */}

      {/* Footer */}
      <footer className="relative bg-transparent py-10 border-t border-gray-800 mt-24 z-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-10">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DocuVerify. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0 text-gray-400">
            <a href="#" className="hover:text-yellow-400 transition">
              <Facebook />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <Twitter />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <Github />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
