'use client';
import Link from 'next/link';
import { FaStethoscope, FaHouseChimney, FaHeart } from 'react-icons/fa6'; 

export default function HomePage() {
  return (
    <div className="space-y-16 max-w-7xl mx-auto p-4">
      
      {/* 🚀 Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-8 md:p-16 text-white flex flex-col items-center text-center space-y-6 shadow-xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Find Your Forever Furry Friend</h1>
        <p className="text-lg md:text-xl max-w-2xl text-teal-50">Every pet deserves a loving home. Browse through our listings and adopt your perfect companion today.</p>
        <Link href="/pets" className="bg-white text-teal-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-teal-50 transition transform hover:-translate-y-1">Adopt Now</Link>
      </section>

      {/* 📝 ৩টি ফিচার কার্ড সেকশন */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 grid md:grid-cols-3 gap-8 text-center">
        <div className="p-4 space-y-3 flex flex-col items-center">
          <div className="text-4xl text-teal-600">
            <FaStethoscope />
          </div>
          <h3 className="font-bold text-xl">Fully Vet-Checked</h3>
          <p className="text-gray-500">All pets receive complete medical evaluations before listing.</p>
        </div>
        <div className="p-4 space-y-3 flex flex-col items-center">
          <div className="text-4xl text-emerald-600">
            <FaHouseChimney />
          </div>
          <h3 className="font-bold text-xl">Smooth Transition</h3>
          <p className="text-gray-500">We assist you with onboarding guidelines for your new pet.</p>
        </div>
        <div className="p-4 space-y-3 flex flex-col items-center">
          <div className="text-4xl text-rose-500">
            <FaHeart />
          </div>
          <h3 className="font-bold text-xl">Lifetime Support</h3>
          <p className="text-gray-500">Join our local community of pet owners for ongoing support.</p>
        </div>
      </section>

      {/* 🎥 Virtual Meet & Greets Section */}
      <section className="bg-amber-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <span className="bg-amber-200 text-amber-800 text-xs uppercase px-3 py-1 rounded-full font-bold">New Feature</span>
          <h2 className="text-3xl font-bold">Schedule Virtual Meet & Greets</h2>
          <p className="text-gray-600">Can't make it to the shelter immediately? Connect digitally with the owners and shelters to see your potential pet live via video call before finalizing!</p>
        </div>
        <button className="bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-amber-700 transition whitespace-nowrap">Learn How It Works</button>
      </section>

    </div>
  );
}