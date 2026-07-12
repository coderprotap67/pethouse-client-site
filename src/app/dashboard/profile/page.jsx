'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../../../utils/api';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    currentPassword: '',
    newPassword: ''
  });
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        photoURL: user.photoURL || ''
      }));
    }
  }, [user]);
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Updating profile...');
    try {
      const res = await api.put('/update-profile', {
        name: formData.name,
        photoURL: formData.photoURL,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      if (res.data.success) {
        setUser(res.data.user);
        toast.dismiss(loadingToast);
        toast.success('Profile updated successfully!');
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '' }));
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || 'Failed to update profile.');
      console.error(err);
    }
  };
  if (!user) return <p className="text-center text-slate-200 mt-10">Loading profile data...</p>;
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#0B132B] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full bg-[#1C2541]/90 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-[#3A506B]/40 text-white transition-all duration-300">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            My <span className="text-teal-400">Profile</span>
          </h1>
          <p className="text-sm text-slate-400 font-medium">View and update your Pet Adoption Portal account details</p>
        </div>
        <form onSubmit={handleUpdateProfile} className="space-y-5">
                    <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
              Full Name
            </label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-[#3A506B] rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-[#0B132B] placeholder-slate-600 transition-all text-sm text-white font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
              Email Address
            </label>
            <input 
              type="email" 
              disabled
              value={formData.email}
              className="w-full px-4 py-3 border border-[#1C2541] rounded-2xl bg-[#0B132B]/40 text-slate-500 cursor-not-allowed text-sm font-medium border-dashed"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
              Photo URL
            </label>
            <input 
              type="url" 
              value={formData.photoURL}
              onChange={(e) => setFormData({...formData, photoURL: e.target.value})}
              className="w-full px-4 py-3 border border-[#3A506B] rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-[#0B132B] placeholder-slate-600 transition-all text-sm text-white font-medium"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
          <div className="border-t border-[#3A506B]/40 my-6 pt-5">
            <h3 className="text-sm font-bold text-teal-400 uppercase tracking-wider mb-4 pl-1">
              Change Password (Optional)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                  Current Password
                </label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                  className="w-full px-4 py-3 border border-[#3A506B] rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-[#0B132B] placeholder-slate-600 transition-all text-sm text-white font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                  New Password
                </label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                  className="w-full px-4 py-3 border border-[#3A506B] rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-[#0B132B] placeholder-slate-600 transition-all text-sm text-white font-medium"
                />
              </div>
            </div>
          </div>
          <button 
            type="submit" 
            className="w-full mt-2 bg-teal-600 text-white py-3 rounded-2xl font-bold text-sm tracking-wide shadow-md shadow-teal-900/30 hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-500/20 active:scale-[0.99] transition-all duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>

    </div>
  );
}