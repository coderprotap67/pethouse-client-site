'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function MyListingsPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [requests, setRequests] = useState([]);

  const fetchListings = () => {
    if (user?.email) {
      api.get(`/owner-listings?email=${user.email}`).then(res => setListings(res.data));
    }
  };
  useEffect(() => { fetchListings(); }, [user]);

  const openRequestsModal = async (petId) => {
    setSelectedPetId(petId);
    const res = await api.get(`/pet-requests/${petId}`);
    setRequests(res.data);
  };

  const handleStatusChange = async (reqId, status, petId) => {
    try {
      await api.patch(`/requests-status/${reqId}`, { status, petId });
      toast.success(`Request ${status}`);
      openRequestsModal(petId); 
      fetchListings(); 
    } catch {
      toast.error("Operation failed");
    }
  };
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      await api.delete(`/pets/${id}`);
      toast.success("Listing deleted");
      fetchListings();
    }
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Pet Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {listings.map(pet => (
          <div key={pet._id} className="flex gap-4 border p-4 rounded-xl items-center bg-gray-50">
            <img src={pet.image} alt={pet.name} className="w-20 h-20 object-cover rounded-lg" />
            <div className="flex-grow">
              <h3 className="font-bold">{pet.name}</h3>
              <p className="text-xs text-gray-500">Fee: ${pet.adoptionFee} | Status: {pet.status}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => openRequestsModal(pet._id)} className="bg-teal-600 text-white text-xs px-3 py-1.5 rounded-md">Requests</button>
                <Link href={`/dashboard/edit-pet/${pet._id}`} className="bg-amber-500 text-white text-xs px-3 py-1.5 rounded-md">Edit</Link>
                <button onClick={() => handleDelete(pet._id)} className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-md">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedPetId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-xl max-w-xl w-full max-h-[80vh] overflow-y-auto relative">
            <h3 className="text-xl font-bold mb-4">Adoption Inquiries</h3>
            <button onClick={() => setSelectedPetId(null)} className="absolute top-4 right-4 text-xl">✕</button>
            {requests.length === 0 ? <p className="text-gray-500">No requests received yet.</p> : (
              <div className="space-y-4">
                {requests.map(req => (
                  <div key={req._id} className="border p-3 rounded-lg bg-gray-50 space-y-1">
                    <p><strong>Name:</strong> {req.requesterName} ({req.requesterEmail})</p>
                    <p><strong>Pickup:</strong> {req.pickupDate}</p>
                    <p><strong>Message:</strong> {req.message}</p>
                    <p><strong>Status:</strong> <span className="font-semibold capitalize">{req.status}</span></p>
                    {req.status === 'pending' && (
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleStatusChange(req._id, 'approved', req.petId)} className="bg-green-600 text-white text-xs px-3 py-1.5 rounded">Approve</button>
                        <button onClick={() => handleStatusChange(req._id, 'rejected', req.petId)} className="bg-red-500 text-white text-xs px-3 py-1.5 rounded">Reject</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}