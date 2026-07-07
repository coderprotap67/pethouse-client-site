'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        
        <div className="flex-1 justify-start">
          <Link href="/" className="text-2xl font-black text-teal-600 tracking-tight">
            PetHouse
          </Link>
        </div>
        
        <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-teal-600 transition">Home</Link>
          <Link href="/pets" className="hover:text-teal-600 transition">All Pets</Link>
        </div>
        
        <div className="flex-1 flex justify-end items-center gap-5 text-sm font-medium text-gray-600">
          {user ? (
            <>
              <Link href="/dashboard/my-requests" className="hover:text-teal-600 transition hidden sm:block">
                Dashboard
              </Link>
              
              <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover border border-teal-500"
                  />
                ) : (
                  <FaUserCircle className="text-2xl text-gray-400" />
                )}
                <span className="text-gray-700 hidden md:inline max-w-[90px] truncate">
                  {user.displayName || 'User'}
                </span>
              </div>

              <button 
                onClick={logout} 
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-5">
              <Link href="/register" className="hover:text-teal-600 transition">
                Register
              </Link>
              <Link 
                href="/login" 
                className="bg-teal-600 text-white px-5 py-2 rounded-xl hover:bg-teal-700 transition shadow-sm"
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