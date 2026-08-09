'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../utils/api'; // 👈 আপনার utils/api ইমপোর্ট করুন

export default function AllPetsPage() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('all');
  const [loading, setLoading] = useState(true);

  // API থেকে ডাটা ফেচ করার ফানশন
  const fetchPets = async () => {
    setLoading(true);
    try {
      // ✅ api.get ব্যবহার করায় এটি স্বয়ংক্রিয়ভাবে /api/pets-এ রিকোয়েস্ট পাঠাবে
      const res = await api.get(`/pets?search=${search}&species=${species}`);
      setPets(res.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [search, species]);

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-black text-white text-center sm:text-left">
          All Available Pets
        </h1>

        {/* Search & Filter Controls */}
        <div className="bg-[#1C2541] p-4 rounded-2xl border border-[#3A506B]/40 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-[#0B132B] border border-[#3A506B] text-slate-100 rounded-xl focus:outline-none focus:border-teal-500 text-sm font-medium"
          />
          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="px-4 py-2.5 bg-[#0B132B] border border-[#3A506B] text-slate-100 rounded-xl focus:outline-none focus:border-teal-500 text-sm font-medium cursor-pointer"
          >
            <option value="all">All Species</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Bird">Bird</option>
          </select>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-medium">Loading available pets...</p>
          </div>
        ) : pets.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg font-medium">No pets found matching your criteria.</p>
          </div>
        ) : (
          /* Pet Grid List */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="bg-[#1C2541]/90 border border-[#3A506B]/40 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between hover:border-teal-500/50 transition-all duration-300"
              >
                <div>
                  <div className="relative h-48 w-full bg-[#0B132B]">
                    <img
                      /* ✅ imageURL এবং image দুটিই চেক করবে */
                      src={pet.imageURL || pet.image || 'https://placedog.net/500/300'}
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${
                        pet.status === 'adopted'
                          ? 'bg-red-950/60 text-red-400 border-red-900/60'
                          : 'bg-emerald-950/60 text-emerald-400 border-emerald-900/60'
                      }`}
                    >
                      {pet.status || 'available'}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h2 className="text-xl font-bold text-white">{pet.name}</h2>
                    <div className="text-xs text-slate-300 space-y-1">
                      <p><span className="text-slate-400 font-semibold">Species:</span> {pet.species}</p>
                      <p><span className="text-slate-400 font-semibold">Breed:</span> {pet.breed || 'N/A'}</p>
                      <p><span className="text-slate-400 font-semibold">Location:</span> {pet.location || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/pets/${pet._id}`}
                    className="w-full block text-center bg-teal-600 hover:bg-teal-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md shadow-teal-900/30"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}