'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black text-teal-600 tracking-tight">PetHouse</Link>
        <div className="flex items-center space-y-0 gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-teal-600 transition">Home</Link>
          <Link href="/pets" className="hover:text-teal-600 transition">All Pets</Link>
          {user ? (
            <>
              <Link href="/dashboard/my-requests" className="hover:text-teal-600 transition">Dashboard</Link>
              <button onClick={logout} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-200 transition">Logout</button>
            </>
          ) : (
            <Link href="/login" className="bg-teal-600 text-white px-5 py-2 rounded-xl hover:bg-teal-700 transition shadow-sm">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}