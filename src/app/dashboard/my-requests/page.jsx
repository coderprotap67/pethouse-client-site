'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function MyRequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      api.get(`/my-requests?email=${user.email}`).then(res => setRequests(res.data));
    }
  }, [user]);

  const handleCancelRequest = async (id) => {
    if (confirm('Are you sure you want to cancel this adoption request?')) {
      try {
        await api.delete(`/requests/${id}`);
        setRequests(requests.filter(req => req._id !== id));
        toast.success('Adoption request cancelled successfully.');
      } catch {
        toast.error('Failed to cancel request.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Adoption Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">You haven't submitted any adoption requests yet.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold uppercase text-gray-500 tracking-wider">
                <th className="p-4">Pet Name</th>
                <th className="p-4">Pickup Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4 font-semibold">{req.petName}</td>
                  <td className="p-4 text-gray-600">{req.pickupDate}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                      req.status === 'approved' ? 'bg-green-50 text-green-700' :
                      req.status === 'rejected' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <Link href={`/pets/${req.petId}`} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-200">
                      View Pet
                    </Link>
                    <button onClick={() => handleCancelRequest(req._id)} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100 transition">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}