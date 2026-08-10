'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function MyRequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRequests = async () => {
      if (user?.email) {
        try {
          const res = await api.get(`/my-requests?email=${user.email}`);
          setRequests(res.data || []);
        } catch (error) {
          console.error("Fetch requests error:", error);
          toast.error("Failed to load your requests");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMyRequests();
  }, [user]);

  const handleCancelRequest = async (id) => {
    if (confirm('Are you sure you want to cancel this adoption request?')) {
      try {
        await api.delete(`/requests/${id}`);
        setRequests(requests.filter(req => req._id !== id));
        toast.success('Adoption request cancelled successfully.');
      } catch (error) {
        console.error("Cancel request error:", error);
        toast.error('Failed to cancel request.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-slate-100">
      <h2 className="text-2xl font-bold text-white tracking-wide">My Adoption Requests</h2>
      
      {requests.length === 0 ? (
        <div className="p-8 text-center bg-slate-800/60 rounded-xl border border-slate-700/60">
          <p className="text-slate-400">You haven't submitted any adoption requests yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-700/60 rounded-xl shadow-lg bg-slate-800/80 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-700/80 text-xs font-semibold uppercase text-slate-400 tracking-wider">
                <th className="p-4">Pet Name</th>
                <th className="p-4">Pickup Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-sm">
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-slate-700/30 transition-colors duration-150">
                  <td className="p-4 font-semibold text-white">{req.petName}</td>
                  <td className="p-4 text-slate-300">{req.pickupDate}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize tracking-wide ${
                      req.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      req.status === 'rejected' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {req.status || 'pending'}
                    </span>
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <Link 
                      href={`/pets/${req.petId}`} 
                      className="bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-600 hover:text-white transition"
                    >
                      View Pet
                    </Link>
                    <button 
                      onClick={() => handleCancelRequest(req._id)} 
                      className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-rose-500/20 transition"
                    >
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