import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 px-4">
      <div className="text-8xl">😿</div>
      <h1 className="text-4xl font-black text-gray-800 tracking-tight">404 - Page Not Found</h1>
      <p className="text-gray-500 max-w-md">Oops! The page you are looking for doesn't exist or has been moved to another shelter.</p>
      <Link href="/" className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-teal-700 transition">
        Back to Home
      </Link>
    </div>
  );
}