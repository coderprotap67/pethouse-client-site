'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { authClient } from '@/lib/auth-client';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', photoURL: '', password: '', confirmPassword: ''
  });
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password.length < 6) return toast.error('Password must be at least 6 characters long.');
    if (!/[A-Z]/.test(password)) return toast.error('Password must contain at least one uppercase letter.');
    if (!/[a-z]/.test(password)) return toast.error('Password must contain at least one lowercase letter.');
    if (password !== confirmPassword) return toast.error('Password and Confirm Password must match.');

    const loadingToast = toast.loading('Registering user...');
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${backendUrl}/api/register`, { name, email, password });
      toast.dismiss(loadingToast);

      if (response.data.success) {
        toast.success('Registration successful! Redirecting to login...');
        router.push('/login');
      } else {
        toast.error(response.data.message || 'Registration failed.');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || 'Something went wrong during registration.');
      console.error(error);
    }
  };

  const handleGoogleRegister = async () => {
    toast.success('Opening Google Accounts...');
    try {
      const targetOrigin = typeof window !== 'undefined' ? window.location.origin : "https://pethouse-client-site.vercel.app";
      
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${targetOrigin}/`,
        redirect: false, 
      });

      if (data?.url) {
        const width = 500;
        const height = 650;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const popup = window.open(
          data.url,
          "Google Sign In",
          `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
        );

        const timer = setInterval(() => {
          if (popup && popup.closed) {
            clearInterval(timer);
            toast.success("Logged in successfully!");
            window.location.href = "/"; 
          }
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message || 'Google Sign-up failed.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-800 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Create <span className="text-teal-400">Account</span>
          </h1>
          <p className="text-sm text-slate-400 font-medium">Join our pet adoption community</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {[
            { label: 'Full Name', type: 'text', key: 'name', placeholder: 'John Doe' },
            { label: 'Email Address', type: 'email', key: 'email', placeholder: 'hello@example.com' },
            { label: 'Photo URL', type: 'url', key: 'photoURL', placeholder: 'https://example.com/photo.jpg' },
            { label: 'Password', type: 'password', key: 'password', placeholder: '••••••••' },
            { label: 'Confirm Password', type: 'password', key: 'confirmPassword', placeholder: '••••••••' }
          ].map((field) => (
            <div key={field.key} className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">{field.label}</label>
              <input 
                type={field.type} 
                required={field.key !== 'photoURL'}
                placeholder={field.placeholder}
                value={formData[field.key]}
                onChange={(e) => setFormData({...formData, [field.key]: e.target.value})} 
                className="w-full px-4 py-3 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-950 placeholder-slate-600 transition-all text-sm text-white font-medium" 
              />
            </div>
          ))}
          <button type="submit" className="w-full mt-2 bg-teal-600 text-white py-3 rounded-2xl font-bold text-sm tracking-wide shadow-md shadow-teal-900/30 hover:bg-teal-500 transition-all">
            Create Account
          </button>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-slate-800"></div>
          <span className="px-3 text-xs text-slate-500 uppercase font-bold tracking-widest">OR</span>
          <div className="flex-1 border-t border-slate-800"></div>
        </div>

        <button 
          onClick={handleGoogleRegister}
          type="button" 
          className="w-full flex items-center justify-center gap-3 border border-slate-700 bg-slate-950 text-slate-200 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-800 transition-all"
        >
          <FcGoogle className="text-xl" />
          <span>Sign up with Google</span>
        </button>

        <p className="text-center text-sm text-slate-400 font-medium pt-2">
          Already have an account?{' '}
          <Link href="/login" className="text-teal-400 font-bold hover:text-teal-300 transition underline-offset-4 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}