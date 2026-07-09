'use client';
import Link from 'next/link';
import { FaStethoscope, FaHouseChimney, FaHeart, FaArrowRight } from 'react-icons/fa6'; 

export default function HomePage() {
  return (
    // 🌌 পুরো পেজে একটি চমৎকার ডার্ক নেভি ব্লু গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড দেওয়া হয়েছে
    <div className="bg-gradient-to-b from-[#0B132B] via-[#1C2541] to-[#0B132B] min-h-screen pb-20 text-gray-100 antialiased font-sans">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-24 pt-10">
        
        {/* 🚀 Hero Section (Dark Cyber-Navy Style) */}
        <section className="relative overflow-hidden bg-[#1C2541]/50 border border-[#3A506B]/30 backdrop-blur-md rounded-[2.5rem] p-10 md:p-20 text-center flex flex-col items-center space-y-8 shadow-2xl shadow-black/40">
          {/* Neon Glow Effects behind the text */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-85 h-85 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight max-w-4xl leading-tight text-white">
            Find Your Forever <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Furry Companion</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
            Every pet deserves a loving home. Browse through our premium listings and adopt your perfect companion today.
          </p>
          <div className="pt-4">
            <Link 
              href="/pets" 
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-1 text-lg overflow-hidden"
            >
              <span>Adopt Now</span>
              {/* স্মুথ অ্যানিমেটেড অ্যারো আইকন */}
              <FaArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </section>

        {/* 📝 3 Feature Cards Section (Ultra Smooth Animations & Glow) */}
        <section className="grid md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1 - Fully Vet-Checked */}
          <div className="group relative bg-[#1C2541]/40 p-8 rounded-2xl border border-[#3A506B]/20 flex flex-col items-center text-center space-y-5 hover:border-cyan-500/50 hover:bg-[#1C2541]/70 transition-all duration-500 shadow-xl hover:shadow-cyan-500/5 transform hover:-translate-y-2 cursor-pointer">
            {/* Smooth Scale and Rotate Animation on Icon Grid */}
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-3xl text-cyan-400 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-cyan-500 group-hover:text-black group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              <FaStethoscope className="transition-transform duration-500" />
            </div>
            <h3 className="font-bold text-xl text-white group-hover:text-cyan-400 transition-colors duration-300">Fully Vet-Checked</h3>
            <p className="text-gray-400 text-sm leading-relaxed">All pets receive complete medical evaluations and necessary vaccinations before listing.</p>
          </div>

          {/* Card 2 - Smooth Transition */}
          <div className="group relative bg-[#1C2541]/40 p-8 rounded-2xl border border-[#3A506B]/20 flex flex-col items-center text-center space-y-5 hover:border-indigo-500/50 hover:bg-[#1C2541]/70 transition-all duration-500 shadow-xl hover:shadow-indigo-500/5 transform hover:-translate-y-2 cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center text-3xl text-indigo-400 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-indigo-500 group-hover:text-black group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <FaHouseChimney className="transition-transform duration-500" />
            </div>
            <h3 className="font-bold text-xl text-white group-hover:text-indigo-400 transition-colors duration-300">Smooth Transition</h3>
            <p className="text-gray-400 text-sm leading-relaxed">We assist you step-by-step with specialized onboarding guidelines for your new family member.</p>
          </div>

          {/* Card 3 - Lifetime Support */}
          <div className="group relative bg-[#1C2541]/40 p-8 rounded-2xl border border-[#3A506B]/20 flex flex-col items-center text-center space-y-5 hover:border-rose-500/50 hover:bg-[#1C2541]/70 transition-all duration-500 shadow-xl hover:shadow-rose-500/5 transform hover:-translate-y-2 cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-rose-950/50 border border-rose-500/30 flex items-center justify-center text-3xl text-rose-400 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-rose-500 group-hover:text-black group-hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]">
              <FaHeart className="transition-transform duration-500" />
            </div>
            <h3 className="font-bold text-xl text-white group-hover:text-rose-400 transition-colors duration-300">Lifetime Support</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Join our local community of loving pet owners for ongoing support, advice, and tips.</p>
          </div>

        </section>

        {/* 🎥 Virtual Meet & Greets Section (Cyber-Navy Neon Look) */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1C2541] to-[#0B132B] border border-[#3A506B]/40 rounded-[2.5rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-xl text-left z-10">
            <span className="inline-block bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs uppercase px-3 py-1 rounded-full font-bold tracking-wider shadow-sm">
              ✨ New Feature
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Schedule Virtual Meet & Greets</h2>
            <p className="text-gray-400 leading-relaxed">
              Can't make it to the shelter immediately? Connect digitally with the owners and shelters to see your potential pet live via video call before finalizing!
            </p>
          </div>
          <button className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-600/20 hover:shadow-orange-600/45 hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap text-md z-10">
            Learn How It Works
          </button>
        </section>

      </div>
    </div>
  );
}