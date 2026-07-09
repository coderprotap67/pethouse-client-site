'use client';
import { useState } from 'react';

export default function PetDetailsForm({ initialData = {}, onSubmit, buttonText = 'Save Pet Details' }) {
  const [formData, setFormData] = useState({
    petName: initialData.petName || '',
    species: initialData.species || 'Dog',
    breed: initialData.breed || '',
    age: initialData.age || '',
    gender: initialData.gender || 'Male',
    image: initialData.image || '',
    healthStatus: initialData.healthStatus || '',
    vaccinationStatus: initialData.vaccinationStatus || '',
    location: initialData.location || '',
    adoptionFee: initialData.adoptionFee || '',
    description: initialData.description || '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Common Tailwind classes for fields to maintain clean code and smooth animations
  const inputClasses = "w-full mt-1 p-2.5 border border-slate-700/60 dark:border-slate-700 rounded-lg bg-slate-900/40 dark:bg-slate-950/40 text-slate-200 placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 ease-in-out";

  return (
    <form 
      onSubmit={handleSubmit} 
      className="grid md:grid-cols-2 gap-6 bg-slate-900 dark:bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-xl transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-slate-950/50"
    >
      
      {/* Pet Name */}
      <div className="flex flex-col">
        <label className="text-sm font-bold text-slate-300">Pet Name</label>
        <input required type="text" name="petName" value={formData.petName} onChange={handleChange} className={inputClasses} />
      </div>

      {/* Species */}
      <div className="flex flex-col">
        <label className="text-sm font-bold text-slate-300">Species</label>
        <select name="species" value={formData.species} onChange={handleChange} className={`${inputClasses} bg-slate-900 dark:bg-slate-950`}>
          <option className="bg-slate-900 text-slate-200">Dog</option>
          <option className="bg-slate-900 text-slate-200">Cat</option>
          <option className="bg-slate-900 text-slate-200">Bird</option>
          <option className="bg-slate-900 text-slate-200">Rabbit</option>
          <option className="bg-slate-900 text-slate-200">Other</option>
        </select>
      </div>

      {/* Breed */}
      <div className="flex flex-col">
        <label className="text-sm font-bold text-slate-300">Breed</label>
        <input required type="text" name="breed" value={formData.breed} onChange={handleChange} className={inputClasses} />
      </div>

      {/* Age */}
      <div className="flex flex-col">
        <label className="text-sm font-bold text-slate-300">Age (Years)</label>
        <input required type="number" name="age" value={formData.age} onChange={handleChange} className={inputClasses} />
      </div>

      {/* Gender */}
      <div className="flex flex-col">
        <label className="text-sm font-bold text-slate-300">Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} className={`${inputClasses} bg-slate-900 dark:bg-slate-950`}>
          <option className="bg-slate-900 text-slate-200">Male</option>
          <option className="bg-slate-900 text-slate-200">Female</option>
        </select>
      </div>

      {/* Image URL */}
      <div className="flex flex-col">
        <label className="text-sm font-bold text-slate-300">Image URL</label>
        <input required type="url" name="image" value={formData.image} onChange={handleChange} className={inputClasses} />
      </div>

      {/* Health Status */}
      <div className="flex flex-col">
        <label className="text-sm font-bold text-slate-300">Health Status</label>
        <input required type="text" name="healthStatus" value={formData.healthStatus} onChange={handleChange} className={inputClasses} placeholder="e.g. Excellent, Healthy" />
      </div>

      {/* Vaccination Status */}
      <div className="flex flex-col">
        <label className="text-sm font-bold text-slate-300">Vaccination Status</label>
        <input required type="text" name="vaccinationStatus" value={formData.vaccinationStatus} onChange={handleChange} className={inputClasses} placeholder="e.g. Fully Vaccinated" />
      </div>

      {/* Location */}
      <div className="flex flex-col">
        <label className="text-sm font-bold text-slate-300">Location</label>
        <input required type="text" name="location" value={formData.location} onChange={handleChange} className={inputClasses} placeholder="City, Country" />
      </div>

      {/* Adoption Fee */}
      <div className="flex flex-col">
        <label className="text-sm font-bold text-slate-300">Adoption Fee ($)</label>
        <input required type="number" name="adoptionFee" value={formData.adoptionFee} onChange={handleChange} className={inputClasses} />
      </div>

      {/* Description */}
      <div className="md:col-span-2 flex flex-col">
        <label className="text-sm font-bold text-slate-300">Description</label>
        <textarea required rows="4" name="description" value={formData.description} onChange={handleChange} className={inputClasses}></textarea>
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2 mt-2">
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold py-3.5 rounded-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-amber-500/20 active:scale-[0.99]"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}