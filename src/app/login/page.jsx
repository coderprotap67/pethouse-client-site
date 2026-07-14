'use client';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Successfully logged in!');
      router.push('/');
    } catch (err) {
      toast.error('Invalid credentials, please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    toast.success('Opening Google Accounts...');
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: typeof window !== 'undefined' ? window.location.origin : "https://pet-client-site.vercel.app", 
      });
    } catch (err) {
      toast.error(err.message || 'Google Auth Failed');
      console.error(err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-[#1C2541]/90 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-[#3A506B]/40 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Welcome <span className="text-teal-400">Back</span>
          </h1>
          <p className="text-sm text-slate-400 font-medium">Login to your PetHouse account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-950 placeholder-slate-600 transition-all text-sm text-white font-medium"
              placeholder="example@mail.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-950 placeholder-slate-600 transition-all text-sm text-white font-medium"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full mt-2 bg-teal-600 text-white py-3 rounded-2xl font-bold text-sm tracking-wide shadow-md shadow-teal-900/30 hover:bg-teal-500 transition-all">
            Login
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-700"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase font-bold tracking-widest">Or</span>
          <div className="flex-grow border-t border-slate-700"></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-slate-700 bg-slate-950 text-slate-200 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-800 transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.62 15.03 1 12 1 7.24 1 3.2 3.74 1.25 7.72l3.8 2.95C6.01 7.28 8.78 5.04 12 5.04z"/>
            <path fill="#4285F4" d="M23.45 12.27c0-.78-.07-1.54-.2-2.27H12v4.51h6.42c-.28 1.45-1.1 2.67-2.33 3.51l3.63 2.81c2.13-1.97 3.33-4.87 3.33-8.58z"/>
            <path fill="#FBBC05" d="M5.05 14.67a7.22 7.22 0 0 1 0-4.34L1.25 7.38a11.96 11.96 0 0 0 0 9.24l3.8-2.95z"/>
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.63-2.81c-1.01.68-2.3 1.09-3.93 1.09-3.22 0-5.99-2.24-6.96-5.28l-3.8 2.95C3.2 20.26 7.24 23 12 23z"/>
          </svg>
          <span>Continue with Google</span>
        </button>
        <p className="text-center text-sm text-slate-400 font-medium pt-2">
          Don't have an account? <Link href="/register" className="text-teal-400 font-bold hover:text-teal-300 transition underline-offset-4 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}