'use client';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function AddPetPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [petData, setPetData] = useState({
    name: '', species: 'Dog', breed: '', age: '', gender: 'Male',
    image: '', healthStatus: '', vaccinationStatus: 'Fully Vaccinated',
    location: '', adoptionFee: '', description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = { ...petData, ownerEmail: user?.email, status: 'available' };
    
    try {
      await api.post('/pets', finalData);
      toast.success('Pet listing added successfully!');
      router.push('/dashboard/my-listings');
    } catch {
      toast.error('Something went wrong, failed to add pet.');
    }
  };

  // Reusable classes for input dark styling and smooth animations
  const inputClasses = "w-full mt-1 p-2.5 bg-slate-950/40 border border-slate-700/60 rounded-lg text-slate-200 outline-none placeholder-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 ease-in-out";

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Add a Pet for Adoption</h2>
      
      <form 
        onSubmit={handleSubmit} 
        className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-slate-950/40"
      >
        {/* Pet Name */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pet Name</label>
          <input type="text" required onChange={(e) => setPetData({...petData, name: e.target.value})} className={inputClasses} placeholder="e.g. Buddy" />
        </div>

        {/* Species */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Species</label>
          <select onChange={(e) => setPetData({...petData, species: e.target.value})} className={`${inputClasses} bg-slate-900`}>
            <option className="bg-slate-900 text-slate-200" value="Dog">Dog</option>
            <option className="bg-slate-900 text-slate-200" value="Cat">Cat</option>
            <option className="bg-slate-900 text-slate-200" value="Bird">Bird</option>
            <option className="bg-slate-900 text-slate-200" value="Rabbit">Rabbit</option>
          </select>
        </div>

        {/* Breed */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Breed</label>
          <input type="text" required onChange={(e) => setPetData({...petData, breed: e.target.value})} className={inputClasses} placeholder="e.g. Golden Retriever" />
        </div>

        {/* Age */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Age (Years)</label>
          <input type="number" required onChange={(e) => setPetData({...petData, age: e.target.value})} className={inputClasses} placeholder="e.g. 2" />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gender</label>
          <select onChange={(e) => setPetData({...petData, gender: e.target.value})} className={`${inputClasses} bg-slate-900`}>
            <option className="bg-slate-900 text-slate-200" value="Male">Male</option>
            <option className="bg-slate-900 text-slate-200" value="Female">Female</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Image URL</label>
          <input type="url" required onChange={(e) => setPetData({...petData, image: e.target.value})} className={inputClasses} placeholder="https://example.com/pet.jpg" />
        </div>

        {/* Vaccination Status */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Vaccination Status</label>
          <select onChange={(e) => setPetData({...petData, vaccinationStatus: e.target.value})} className={`${inputClasses} bg-slate-900`}>
            <option className="bg-slate-900 text-slate-200" value="Fully Vaccinated">Fully Vaccinated</option>
            <option className="bg-slate-900 text-slate-200" value="Partially Vaccinated">Partially Vaccinated</option>
            <option className="bg-slate-900 text-slate-200" value="Not Vaccinated">Not Vaccinated</option>
          </select>
        </div>

        {/* Adoption Fee */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Adoption Fee ($)</label>
          <input type="number" required onChange={(e) => setPetData({...petData, adoptionFee: e.target.value})} className={inputClasses} placeholder="0 for free" />
        </div>

        {/* Owner Email (Read Only) */}
        <div className="md:col-span-2 flex flex-col">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Owner Email (Read Only)</label>
          <input type="text" value={user?.email || ''} readOnly className="w-full mt-1 p-2.5 bg-slate-950/20 border border-slate-800 rounded-lg text-slate-500 cursor-not-allowed outline-none" />
        </div>

        {/* Description */}
        <div className="md:col-span-2 flex flex-col">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</label>
          <textarea required rows="4" onChange={(e) => setPetData({...petData, description: e.target.value})} className={inputClasses} placeholder="Tell something about your pet's nature, habits..."></textarea>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="md:col-span-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-950 p-3.5 rounded-xl font-bold transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-teal-500/20 active:scale-[0.99] mt-2"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
}