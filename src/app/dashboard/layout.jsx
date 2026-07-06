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

  if (loading) return <div className="text-center py-20 text-teal-600 font-semibold">Loading Dashboard Security Access...</div>;

  const links = [
    { href: '/dashboard/my-listings', label: 'My Listings' },
    { href: '/dashboard/add-pet', label: 'Add Pet' },
    { href: '/dashboard/my-requests', label: 'My Requests' }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-4">
      <aside className="w-full md:w-64 bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex md:flex-col gap-2 overflow-x-auto whitespace-nowrap">
        {links.map(link => (
          <Link 
            key={link.href} 
            href={link.href}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition ${pathname === link.href ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            {link.label}
          </Link>
        ))}
      </aside>
      <section className="flex-grow bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        {children}
      </section>
    </div>
  );
}