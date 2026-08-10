'use client';
import { useState, useEffect } from 'react';
import api from '../../utils/api';
import PetCard from '../../components/PetCard';

export default function AllPetsPage() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('all');
  const [dataLoading, setDataLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setDataLoading(true);
        const query = new URLSearchParams();
        if (search.trim()) {
          query.append('search', search.trim());
        }
        if (species && species !== 'all') {
          query.append('species', species);
        }
        const queryString = query.toString();
        const endpoint = queryString ? `/pets?${queryString}` : '/pets';
        const res = await api.get(endpoint);
        setPets(res.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setDataLoading(false);
      }
    }, 300); 
    return () => clearTimeout(timer);
  }, [search, species]);
  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto text-gray-100">
      <h1 className="text-3xl font-black text-white tracking-tight">All Available Pets</h1>
      <div className="flex flex-col md:flex-row gap-4 bg-[#1C2541]/40 border border-[#3A506B]/30 backdrop-blur-md p-4 rounded-xl shadow-xl">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow bg-[#0B132B]/60 border border-[#3A506B]/40 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition"/>
        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="p-3 bg-[#0B132B]/60 border border-[#3A506B]/40 text-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 transition cursor-pointer">
          <option value="all" className="bg-[#1C2541]">All Species</option>
          <option value="Dog" className="bg-[#1C2541]">Dog</option>
          <option value="Cat" className="bg-[#1C2541]">Cat</option>
          <option value="Bird" className="bg-[#1C2541]">Bird</option>
          <option value="Rabbit" className="bg-[#1C2541]">Rabbit</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataLoading ? (
          <p className="text-center col-span-full text-cyan-400 font-medium py-12 animate-pulse">
            Loading pets data...
          </p>
        ) : pets.length > 0 ? (
          pets.map((pet) => <PetCard key={pet._id} pet={pet} />)
        ) : (
          <p className="text-center col-span-full text-gray-400 py-12">
            No pets found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}