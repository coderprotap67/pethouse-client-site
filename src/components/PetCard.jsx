import Link from 'next/link';

export default function PetCard({ pet }) {
  return (
    <div className="group bg-[#1C2541]/40 border border-[#3A506B]/30 rounded-2xl overflow-hidden shadow-xl hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.05)] transition-all duration-300 flex flex-col h-full">
      
      <div className="relative h-56 w-full overflow-hidden">
        <img 
          src={pet.imageURL} 
          alt={pet.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>
      
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4 bg-[#1C2541]/20">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
              {pet.name}
            </h3>
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold px-2.5 py-1 rounded-full">
              {pet.species}
            </span>
          </div>
          
          <p className="text-sm text-gray-400 mt-1">{pet.breed} • {pet.age} Years</p>
          <p className="text-sm font-bold text-cyan-400 mt-2">${pet.adoptionFee || '0'} Adoption Fee</p>
        </div>
        
        <Link 
          href={`/pets/${pet._id}`} 
          className="block text-center bg-[#0B132B] border border-[#3A506B]/50 text-gray-200 text-sm font-semibold py-2.5 rounded-xl hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:border-transparent transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}