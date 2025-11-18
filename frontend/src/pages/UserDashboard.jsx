import React from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="bg-black text-white font-sans antialiased">
      <main className="container mx-auto px-4 lg:px-24 py-16">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between bg-gray-950 rounded-2xl p-8 lg:p-16 mb-20 shadow-xl">
          {/* Text Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
              Secure Your Future with Verified Documents.
            </h1>
            <p className="text-gray-300 text-base lg:text-lg mb-8 max-w-lg">
              Certify offers a seamless, secure, and verifiable solution for all
              your document authentication needs, ensuring trust and integrity.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/upload"
                className="bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-600 transition shadow-md transform hover:scale-105"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="bg-transparent border-2 border-yellow-500 text-yellow-500 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition shadow-md transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Illustration */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src="https://placehold.co/500x350/1e293b/fcd34d?text=Document+Security"
              alt="Document Security Illustration"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-16 text-center">
          <h2 className="text-4xl font-bold mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 rounded-2xl p-6 shadow-xl hover:scale-105 hover:shadow-2xl transition">
              <img
                src="https://placehold.co/100x100/fcd34d/1e293b?text=⚡"
                alt="Fast Verification"
                className="mx-auto mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2">Fast Verification</h3>
              <p className="text-gray-400 text-sm">
                Automated processes ensure your documents are verified in
                minutes, not days.
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 shadow-xl hover:scale-105 hover:shadow-2xl transition">
              <img
                src="https://placehold.co/100x100/fcd34d/1e293b?text=🔒"
                alt="Secure Storage"
                className="mx-auto mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
              <p className="text-gray-400 text-sm">
                Your certified documents are stored using industry-leading
                encryption and security protocols.
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 shadow-xl hover:scale-105 hover:shadow-2xl transition">
              <img
                src="https://placehold.co/100x100/fcd34d/1e293b?text=📜"
                alt="Digital Certification"
                className="mx-auto mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2">Digital Certification</h3>
              <p className="text-gray-400 text-sm">
                Receive verifiable digital certificates for your authenticated
                documents.
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 shadow-xl hover:scale-105 hover:shadow-2xl transition">
              <img
                src="https://placehold.co/100x100/fcd34d/1e293b?text=🌍"
                alt="Global Accessibility"
                className="mx-auto mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2">Global Accessibility</h3>
              <p className="text-gray-400 text-sm">
                Access and share your documents securely from anywhere, anytime,
                globally.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between bg-gray-950 rounded-2xl p-8 lg:p-16 mb-20 shadow-xl">
          <div className="lg:w-1/2 mb-12 lg:mb-0 flex justify-center lg:justify-start">
            <img
              src="https://placehold.co/600x400/1e293b/fcd34d?text=Trusted+Partners"
              alt="Trusted Partners"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-16">
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-6">
              Why Choose Certify for Your Verification Needs?
            </h2>
            <ul className="space-y-4 text-gray-300 text-base lg:text-lg">
              <li className="flex items-start">
                <span className="text-yellow-500 text-xl mr-3">✔</span>
                Unmatched Security for all your sensitive data.
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 text-xl mr-3">✔</span>
                Streamlined Workflow to simplify your document verification
                process.
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 text-xl mr-3">✔</span>
                Trusted by Professionals for reliable and efficient verification.
              </li>
            </ul>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-yellow-500 text-gray-900 rounded-2xl p-8 lg:p-16 text-center shadow-xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Certify Your Documents?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust Certify for reliable and
            secure document verification.
          </p>
          <Link
            to="/upload"
            className="bg-gray-900 text-yellow-500 font-semibold px-8 py-4 rounded-lg hover:bg-gray-800 transition shadow-lg transform hover:scale-105"
          >
            Get Started Today
          </Link>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
