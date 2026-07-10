'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading]);

  if (loading) {
    return (
      <div className="text-center py-20 text-cyan-400 font-semibold animate-pulse">
        Loading Dashboard Security Access...
      </div>
    );
  }

  const links = [
    { href: '/dashboard/my-listings', label: 'My Listings' },
    { href: '/dashboard/add-pet', label: 'Add Pet' },
    { href: '/dashboard/my-requests', label: 'My Requests' }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-4 min-h-[calc(100vh-12rem)]">
            <aside className="w-full md:w-64 bg-[#1C2541]/40 border border-[#3A506B]/20 backdrop-blur-md p-4 rounded-xl shadow-xl flex md:flex-col gap-2 overflow-x-auto whitespace-nowrap">
        {links.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                  : 'text-gray-400 hover:text-white hover:bg-[#1C2541]/60'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </aside>
      <section className="flex-grow bg-[#1C2541]/20 border border-[#3A506B]/20 backdrop-blur-md p-6 rounded-xl shadow-xl">
        {children}
      </section>

    </div>
  );
}