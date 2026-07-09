'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    // 🌌 ডার্ক ব্লার ব্যাকগ্রাউন্ড এবং বর্ডার ইফেক্ট
    <nav className="bg-[#0B132B]/80 border-b border-[#3A506B]/20 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        
        <div className="flex-1 justify-start">
          <Link href="/" className="text-2xl font-black text-cyan-400 tracking-tight hover:opacity-90 transition">
            PetHouse
          </Link>
        </div>
        
        <div className="flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link href="/pets" className="hover:text-cyan-400 transition">All Pets</Link>
        </div>
        
        <div className="flex-1 flex justify-end items-center gap-5 text-sm font-medium text-gray-300">
          {user ? (
            <>
              <Link href="/dashboard/my-requests" className="hover:text-cyan-400 transition hidden sm:block">
                Dashboard
              </Link>
              
              <div className="flex items-center gap-2 border-l pl-4 border-[#3A506B]/40">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover border border-cyan-400"
                  />
                ) : (
                  <FaUserCircle className="text-2xl text-gray-400" />
                )}
                <span className="text-gray-200 hidden md:inline max-w-[90px] truncate">
                  {user.displayName || 'User'}
                </span>
              </div>

              <button 
                onClick={logout} 
                className="bg-[#1C2541] border border-[#3A506B]/50 text-gray-200 px-4 py-2 rounded-xl hover:bg-[#3A506B]/40 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-5">
              <Link href="/register" className="hover:text-cyan-400 transition">
                Register
              </Link>
              <Link 
                href="/login" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-xl hover:opacity-95 transition shadow-md shadow-cyan-500/10"
              >
                Login
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}