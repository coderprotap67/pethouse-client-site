import Link from 'next/link';

export default function PetCard({ pet }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
      {/* 📋 এখানে pet.image পরিবর্তন করে pet.imageURL করা হয়েছে */}
      <img src={pet.imageURL} alt={pet.name} className="h-56 w-full object-cover" />
      
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
            <span className="bg-teal-50 text-teal-700 text-xs font-semibold px-2.5 py-1 rounded-full">{pet.species}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{pet.breed} • {pet.age}</p>
          <p className="text-sm font-semibold text-teal-600 mt-2">${pet.adoptionFee || '0'} Adoption Fee</p>
        </div>
        <Link href={`/pets/${pet._id}`} className="block text-center bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-800 transition">
          View Details
        </Link>
      </div>
    </div>
  );
}