'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../../../../utils/api';
import toast from 'react-hot-toast';

export default function EditPetPage() {
  const { id } = useParams();
  const router = useRouter();
  const [petData, setPetData] = useState(null);

  useEffect(() => {
    api.get(`/pets/${id}`).then(res => setPetData(res.data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/pets/${id}`, petData);
      toast.success('Pet information updated V2!');
      router.push('/dashboard/my-listings');
    } catch {
      toast.error('Failed to update details.');
    }
  };

  if (!petData) return <div className="text-center py-10 text-gray-400">Loading pet data...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Update Pet Details</h2>
      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-gray-500">Pet Name</label>
          <input type="text" value={petData.name} onChange={e => setPetData({...petData, name: e.target.value})} className="w-full mt-1 p-2.5 border rounded-lg" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500">Adoption Fee ($)</label>
          <input type="number" value={petData.adoptionFee} onChange={e => setPetData({...petData, adoptionFee: e.target.value})} className="w-full mt-1 p-2.5 border rounded-lg" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-500">Description</label>
          <textarea rows="4" value={petData.description} onChange={e => setPetData({...petData, description: e.target.value})} className="w-full mt-1 p-2.5 border rounded-lg"></textarea>
        </div>
        <button type="submit" className="md:col-span-2 bg-amber-500 text-white p-3 rounded-xl font-bold hover:bg-amber-600 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
}