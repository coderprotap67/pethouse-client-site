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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Add a Pet for Adoption</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-gray-500">Pet Name</label>
          <input type="text" required onChange={(e) => setPetData({...petData, name: e.target.value})} className="w-full mt-1 p-2.5 border rounded-lg focus:outline-teal-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500">Species</label>
          <select onChange={(e) => setPetData({...petData, species: e.target.value})} className="w-full mt-1 p-2.5 border rounded-lg focus:outline-teal-500 bg-white">
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500">Breed</label>
          <input type="text" required onChange={(e) => setPetData({...petData, breed: e.target.value})} className="w-full mt-1 p-2.5 border rounded-lg focus:outline-teal-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500">Age (Years)</label>
          <input type="number" required onChange={(e) => setPetData({...petData, age: e.target.value})} className="w-full mt-1 p-2.5 border rounded-lg focus:outline-teal-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500">Gender</label>
          <select onChange={(e) => setPetData({...petData, gender: e.target.value})} className="w-full mt-1 p-2.5 border rounded-lg focus:outline-teal-500 bg-white">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500">Image URL</label>
          <input type="url" required onChange={(e) => setPetData({...petData, image: e.target.value})} className="w-full mt-1 p-2.5 border rounded-lg focus:outline-teal-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500">Vaccination Status</label>
          <select onChange={(e) => setPetData({...petData, vaccinationStatus: e.target.value})} className="w-full mt-1 p-2.5 border rounded-lg focus:outline-teal-500 bg-white">
            <option value="Fully Vaccinated">Fully Vaccinated</option>
            <option value="Partially Vaccinated">Partially Vaccinated</option>
            <option value="Not Vaccinated">Not Vaccinated</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500">Adoption Fee ($)</label>
          <input type="number" required onChange={(e) => setPetData({...petData, adoptionFee: e.target.value})} className="w-full mt-1 p-2.5 border rounded-lg focus:outline-teal-500" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-500">Owner Email (Read Only)</label>
          <input type="text" value={user?.email || ''} readOnly className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50 text-gray-400" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-500">Description</label>
          <textarea required rows="4" onChange={(e) => setPetData({...petData, description: e.target.value})} className="w-full mt-1 p-2.5 border rounded-lg focus:outline-teal-500"></textarea>
        </div>
        <button type="submit" className="md:col-span-2 bg-teal-600 text-white p-3 rounded-xl font-bold hover:bg-teal-700 transition">
          Submit Listing
        </button>
      </form>
    </div>
  );
}