import React from "react";
import { Link } from "wouter";

const Terms = () => {
  return (
    <div className="min-h-screen bg-brand-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="bg-black text-white rounded-2xl shadow-xl p-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 uppercase">Terms & Conditions</h1>
          <div className="space-y-4 text-gray-300">
            <p>By using VKW Enterprises services, you agree to the following terms:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Service timelines depend on external authority processing times.</li>
              <li>All customer information is handled confidentially.</li>
              <li>Payments for services are non-refundable once processing begins.</li>
              <li>Customers must provide accurate and complete information.</li>
            </ul>
            <p>For any clarifications, please contact us via the details provided on the Contact section.</p>
          </div>
          <div className="mt-10">
            <Link href="/" className="inline-block bg-white/10 hover:bg-white/20 text-white rounded-lg px-5 py-3 transition-colors">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;