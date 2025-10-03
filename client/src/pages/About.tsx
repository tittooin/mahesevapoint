import React from "react";
import { Link } from "wouter";

const About = () => {
  return (
    <div className="min-h-screen bg-brand-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="bg-black text-white rounded-2xl shadow-xl p-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 uppercase">VKW Enterprises</h1>
          <p className="text-gray-300 mb-8 max-w-3xl">
            VKW Enterprises is a trusted service center providing professional assistance for government and documentation services. 
            We focus on reliable, efficient, and customer-first experiences.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
              <p className="text-gray-300">To simplify access to essential services with transparency and speed.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">What We Offer</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Documentation support and guidance</li>
                <li>Online application assistance</li>
                <li>Customer support via phone and WhatsApp</li>
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <Link href="/" className="inline-block bg-white/10 hover:bg-white/20 text-white rounded-lg px-5 py-3 transition-colors">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;