'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', photoURL: '', password: '', confirmPassword: ''
  });
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error('Password must contain at least one uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
      return toast.error('Password must contain at least one lowercase letter.');
    }
    if (password !== confirmPassword) {
      return toast.error('Password and Confirm Password must match.');
    }

    toast.success('Registration successful! Redirecting to login...');
    router.push('/login');
  };

  const handleGoogleRegister = async () => {
    try {
      toast.loading('Connecting with Google...');
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || 'Google Sign-up failed.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-teal-50/50 via-white to-orange-50/30 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 space-y-6 transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            Create <span className="text-teal-600">Account</span>
          </h1>
          <p className="text-sm text-gray-400 font-medium">Join our pet adoption community</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          {[
            { label: 'Full Name', type: 'text', key: 'name', placeholder: 'John Doe' },
            { label: 'Email Address', type: 'email', key: 'email', placeholder: 'hello@example.com' },
            { label: 'Photo URL', type: 'url', key: 'photoURL', placeholder: 'https://example.com/photo.jpg' },
            { label: 'Password', type: 'password', key: 'password', placeholder: '••••••••' },
            { label: 'Confirm Password', type: 'password', key: 'confirmPassword', placeholder: '••••••••' }
          ].map((field) => (
            <div key={field.key} className="space-y-1">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1">
                {field.label}
              </label>
              <input 
                type={field.type} 
                required 
                placeholder={field.placeholder}
                onChange={(e) => setFormData({...formData, [field.key]: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white/50 placeholder-gray-300 transition-all text-sm text-gray-700 font-medium" 
              />
            </div>
          ))}
          
          {/* Register Button */}
          <button 
            type="submit" 
            className="w-full mt-2 bg-teal-600 text-white py-3 rounded-2xl font-bold text-sm tracking-wide shadow-md shadow-teal-600/10 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/20 active:scale-[0.99] transition-all duration-200"
          >
            Create Account
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-100"></div>
          <span className="px-3 text-xs text-gray-400 uppercase font-bold tracking-widest">OR</span>
          <div className="flex-1 border-t border-gray-100"></div>
        </div>

        {/* Google Button */}
        <button 
          onClick={handleGoogleRegister}
          type="button" 
          className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white text-gray-700 py-3 rounded-2xl font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 active:scale-[0.99] transition-all duration-200 shadow-sm"
        >
          <FcGoogle className="text-xl" />
          <span>Sign up with Google</span>
        </button>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500 font-medium pt-2">
          Already have an account?{' '}
          <Link href="/login" className="text-teal-600 font-bold hover:text-teal-700 transition underline-offset-4 hover:underline">
            Login here
          </Link>
        </p>
      </div>

    </div>
  );
}