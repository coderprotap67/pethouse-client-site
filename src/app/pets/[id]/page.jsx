'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function PetDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [pet, setPet] = useState(null);
  const [pickupDate, setPickupDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get(`/pets/${id}`)
      .then(res => setPet(res.data))
      .catch(err => console.error("Error fetching pet details:", err));
  }, [id]);

  if (!pet) return <div className="text-center py-20 text-slate-400 bg-slate-950 min-h-screen">Loading details...</div>;

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to submit adoption request");
      return router.push('/login');
    }

    if (user.email === pet.ownerEmail) {
      return toast.error("You cannot adopt your own listed pet!");
    }

    const requestData = {
      petId: pet._id,
      petName: pet.name,
      ownerEmail: pet.ownerEmail,
      requesterName: user.name,
      requesterEmail: user.email,
      pickupDate,
      message,
      status: 'pending'
    };

    try {
      await api.post('/requests', requestData);
      toast.success("Adoption request sent successfully!");
      router.push('/dashboard/my-requests');
    } catch (error) {
      toast.error("Failed to send request.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto py-6">
        
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800">
          <img src={pet.imageURL} alt={pet.name} className="w-full h-96 object-cover" />
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">{pet.name}</h1>
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${pet.status === 'adopted' ? 'bg-red-950/50 text-red-400 border border-red-900' : 'bg-emerald-950/50 text-emerald-400 border border-emerald-900'}`}>
                {pet.status || 'available'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm bg-slate-950/50 p-4 rounded-xl border border-slate-800/60">
              <p><strong className="text-slate-400">Breed:</strong> {pet.breed || 'N/A'}</p>
              <p><strong className="text-slate-400">Age:</strong> {pet.age} Years</p>
              <p><strong className="text-slate-400">Gender:</strong> {pet.gender || 'N/A'}</p>
              <p><strong className="text-slate-400">Health Status:</strong> {pet.healthStatus || 'N/A'}</p>
            </div>
            
            <p className="text-slate-300 leading-relaxed">{pet.description}</p>
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800 h-fit space-y-4">
          <h2 className="text-xl font-bold border-b border-slate-800 pb-2 text-white">Adoption Form</h2>
          {pet.status === 'adopted' ? (
            <p className="text-red-400 font-semibold text-center py-4">This pet has already been adopted.</p>
          ) : (
            <form onSubmit={handleAdoptSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium">Pet Name</label>
                <input type="text" value={pet.name} readOnly className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg outline-none cursor-not-allowed" />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium">Requester Email</label>
                <input type="text" value={user?.email || 'Login Required'} readOnly className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg outline-none cursor-not-allowed" />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium">Preferred Pickup Date</label>
                <input type="date" required value={pickupDate} onChange={e => setPickupDate(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-100 rounded-lg focus:outline-none focus:border-teal-500 color-scheme-dark" />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium">Why do you want to adopt?</label>
                <textarea required value={message} onChange={e => setMessage(e.target.value)} rows="3" className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-100 rounded-lg focus:outline-none focus:border-teal-500"></textarea>
              </div>
              <button 
                type="submit" 
                disabled={user?.email === pet.ownerEmail} 
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:border disabled:border-slate-800/50 transition-colors"
              >
                Submit adoption request
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}