'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', photoURL: '', password: '', confirmPassword: ''
  });
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    // Password Validation Rules
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

  return (
    <div className="max-w-md w-full mx-auto my-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="text-sm text-gray-400">Join our pet adoption community</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
          <input type="text" required onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full mt-1 p-2.5 border rounded-xl focus:outline-teal-500 bg-gray-50" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
          <input type="email" required onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full mt-1 p-2.5 border rounded-xl focus:outline-teal-500 bg-gray-50" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Photo URL</label>
          <input type="url" required onChange={(e) => setFormData({...formData, photoURL: e.target.value})} className="w-full mt-1 p-2.5 border rounded-xl focus:outline-teal-500 bg-gray-50" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Password</label>
          <input type="password" required onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full mt-1 p-2.5 border rounded-xl focus:outline-teal-500 bg-gray-50" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Confirm Password</label>
          <input type="password" required onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="w-full mt-1 p-2.5 border rounded-xl focus:outline-teal-500 bg-gray-50" />
        </div>
        <button type="submit" className="w-full bg-teal-600 text-white p-3 rounded-xl font-semibold hover:bg-teal-700 transition">
          Register
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Already have an account? <Link href="/login" className="text-teal-600 font-semibold hover:underline">Login here</Link>
      </p>
    </div>
  );
}