'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

export default function PetDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [pet, setPet] = useState(null);
  const [pickupDate, setPickupDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    
    fetch(`https://pet-server-site.vercel.app/api/pets/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch pet details");
        return res.json();
      })
      .then(data => {
        setPet(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching pet details:", err);
        toast.error("Failed to load pet details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#0B132B] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium text-slate-400">Loading details...</p>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#0B132B] flex items-center justify-center text-white">
        <p className="text-xl text-slate-400">Pet details not found.</p>
      </div>
    );
  }
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
      const response = await fetch('https://pet-server-site.vercel.app/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error("Failed to send adoption request");

      toast.success("Adoption request sent successfully!");
      router.push('/dashboard/my-requests');
    } catch (error) {
      console.error(error);
      toast.error("Failed to send request.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0B132B] text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto py-6">
        <div className="lg:col-span-2 bg-[#1C2541]/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-[#3A506B]/40">          
          <div className="relative h-96 w-full bg-[#0B132B] border-b border-[#3A506B]/20">
            <img 
              src={pet.image || pet.imageURL || "https://placedog.net/600/400"} 
              alt={pet.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="p-6 space-y-5">
            <div className="flex justify-between items-center gap-4">
              <h1 className="text-3xl font-black text-white tracking-tight">{pet.name}</h1>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-sm ${
                pet.status === 'adopted' 
                  ? 'bg-red-950/40 text-red-400 border-red-900/50' 
                  : 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50'
              }`}>
                {pet.status || 'available'}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm bg-[#0B132B]/60 p-4 rounded-2xl border border-[#3A506B]/20">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Breed / Species</p>
                <p className="font-semibold text-slate-200 mt-0.5">{pet.breed || pet.species || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Age</p>
                <p className="font-semibold text-slate-200 mt-0.5">{pet.age} Years</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Gender</p>
                <p className="font-semibold text-slate-200 mt-0.5">{pet.gender || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Health Status</p>
                <p className="font-semibold text-slate-200 mt-0.5">{pet.healthStatus || 'Healthy'}</p>
              </div>
            </div>
             <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">About {pet.name}</h3>
              <p className="text-slate-300 leading-relaxed text-sm bg-[#0B132B]/20 p-4 rounded-2xl border border-[#3A506B]/10">
                {pet.description}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#1C2541]/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-[#3A506B]/40 h-fit space-y-5">
          <div className="border-b border-[#3A506B]/30 pb-3">
            <h2 className="text-xl font-black text-white tracking-tight">
              Adoption <span className="text-teal-400">Form</span>
            </h2>
          </div>
          {pet.status === 'adopted' ? (
            <div className="bg-red-950/20 border border-red-900/30 rounded-2xl p-4 text-center">
              <p className="text-red-400 font-bold text-sm">This pet has already been successfully adopted! 🎉</p>
            </div>
          ) : (
            <form onSubmit={handleAdoptSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Pet Name</label>
                <input type="text" value={pet.name} readOnly className="w-full px-4 py-2.5 bg-[#0B132B]/60 border border-[#3A506B]/50 text-slate-400 rounded-xl outline-none cursor-not-allowed text-sm font-medium" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Requester Email</label>
                <input type="text" value={user?.email || 'Login Required'} readOnly className="w-full px-4 py-2.5 bg-[#0B132B]/60 border border-[#3A506B]/50 text-slate-400 rounded-xl outline-none cursor-not-allowed text-sm font-medium" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Preferred Pickup Date</label>
                <input 
                  type="date" 
                  required 
                  value={pickupDate} 
                  onChange={e => setPickupDate(e.target.value)} 
                  className="w-full px-4 py-2.5 bg-[#0B132B] border border-[#3A506B] text-slate-100 rounded-xl focus:outline-none focus:border-teal-500 transition-colors text-sm font-medium [color-scheme:dark]" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Why do you want to adopt?</label>
                <textarea 
                  required 
                  value={message} 
                  onChange={e => setMessage(e.target.value)} 
                  rows="3" 
                  placeholder="Tell the owner why you are a great match..."
                  className="w-full px-4 py-2.5 bg-[#0B132B] border border-[#3A506B] text-slate-100 rounded-xl focus:outline-none focus:border-teal-500 placeholder-slate-600 transition-colors text-sm font-medium"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={user?.email === pet.ownerEmail} 
                className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold text-sm tracking-wide shadow-md shadow-teal-900/30 hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-500/20 active:scale-[0.99] disabled:bg-[#0B132B]/40 disabled:text-slate-600 disabled:border disabled:border-[#3A506B]/20 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200"
              >
                {user?.email === pet.ownerEmail ? 'Your Own Listing' : 'Submit Adoption Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}