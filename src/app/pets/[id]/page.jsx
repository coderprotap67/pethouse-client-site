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
    api.get(`/pets/${id}`).then(res => setPet(res.data));
  }, [id]);

  if (!pet) return <div className="text-center py-20 text-gray-500">Loading details...</div>;

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
    } catch {
      toast.error("Failed to send request.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <img src={pet.image} alt={pet.name} className="w-full h-96 object-cover" />
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{pet.name}</h1>
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${pet.status === 'adopted' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{pet.status}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl">
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p>strong&gt;Age:&lt;/strong&gt; {pet.age} Years</p>
            <p><strong>Gender:</strong> {pet.gender}</p>
            <p><strong>Health Status:</strong> {pet.healthStatus}</p>
          </div>
          <p className="text-gray-600 leading-relaxed">{pet.description}</p>
        </div>
      </div>

      {/* Adoption Panel Form */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-4">
        <h2 className="text-xl font-bold border-b pb-2">Adoption Form</h2>
        {pet.status === 'adopted' ? (
          <p className="text-red-500 font-semibold text-center py-4">This pet has already been adopted.</p>
        ) : (
          <form onSubmit={handleAdoptSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-500">Pet Name</label>
              <input type="text" value={pet.name} readOnly className="w-full p-2.5 bg-gray-50 border rounded-lg" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Requester Email</label>
              <input type="text" value={user?.email || 'Login Required'} readOnly className="w-full p-2.5 bg-gray-50 border rounded-lg" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Preferred Pickup Date</label>
              <input type="date" required value={pickupDate} onChange={e => setPickupDate(e.target.value)} className="w-full p-2.5 border rounded-lg focus:outline-teal-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Why do you want to adopt?</label>
              <textarea required value={message} onChange={e => setMessage(e.target.value)} rows="3" className="w-full p-2.5 border rounded-lg focus:outline-teal-500"></textarea>
            </div>
            <button type="submit" disabled={user?.email === pet.ownerEmail} className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-300">Submit adoption request</button>
          </form>
        )}
      </div>
    </div>
  );
}