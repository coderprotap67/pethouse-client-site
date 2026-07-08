'use client';
import { useState, useEffect } from 'react';
import api from '../../utils/api';
import PetCard from '../../components/PetCard';

export default function AllPetsPage() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('all');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await api.get(`/pets?search=${search}&species=${species}`);
        setPets(res.data);
      } catch (error) {
        console.error("Error fetching pets in frontend:", error);
      }
    };
    fetchPets();
  }, [search, species]);

  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">All Available Pets</h1>
      
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow p-3 border border-gray-200 rounded-lg focus:outline-teal-500"
        />
        <select 
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="p-3 border border-gray-200 rounded-lg focus:outline-teal-500 bg-white"
        >
          <option value="all">All Species</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Rabbit">Rabbit</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.length > 0 ? (
          pets.map(pet => <PetCard key={pet._id} pet={pet} />)
        ) : (
          <p className="text-center col-span-full text-gray-500 py-12">No pets found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}