'use client';

import { useState } from 'react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';

export default function FlightSearch() {
  const [tripType, setTripType] = useState<'round-trip' | 'one-way'>('round-trip');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: '1',
    cabinClass: 'economy'
  });

  const cities = [
    'Djibouti',
    'Addis-Abeba',
    'Nairobi',
    'Dar es Salaam',
    'Kigali',
    'Kampala',
    'Mogadishu',
    'Asmara',
    'Paris',
    'Dubai',
    'Istanbul'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search data:', { tripType, ...formData });
    // TODO: Implement flight search functionality
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Get tomorrow's date for min date attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="bg-white rounded-xl shadow-2xl p-8 -mt-20 relative z-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trip Type Selection */}
          <div className="flex flex-wrap gap-4 mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                className="w-4 h-4 text-blue-main focus:ring-blue-main"
                value="round-trip"
                checked={tripType === 'round-trip'}
                onChange={(e) => setTripType(e.target.value as 'round-trip')}
              />
              <span className="text-gray-700 font-medium">Aller-retour</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                className="w-4 h-4 text-blue-main focus:ring-blue-main"
                value="one-way"
                checked={tripType === 'one-way'}
                onChange={(e) => setTripType(e.target.value as 'one-way')}
              />
              <span className="text-gray-700 font-medium">Aller simple</span>
            </label>
          </div>

          {/* Location and Date Inputs */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* From */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                De
              </label>
              <select
                name="from"
                required
                value={formData.from}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
              >
                <option value="">Ville de départ</option>
                {cities.map(city => (
                  <option key={`from-${city}`} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* To */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Vers
              </label>
              <select
                name="to"
                required
                value={formData.to}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
              >
                <option value="">Ville d&apos;arrivée</option>
                {cities.map(city => (
                  <option key={`to-${city}`} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Departure Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Départ
              </label>
              <input
                type="date"
                name="departureDate"
                required
                min={minDate}
                value={formData.departureDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
              />
            </div>

            {/* Return Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Retour
              </label>
              <input
                type="date"
                name="returnDate"
                required={tripType === 'round-trip'}
                disabled={tripType === 'one-way'}
                min={formData.departureDate || minDate}
                value={formData.returnDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Passengers, Class, and Search Button */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Passengers */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Passagers
              </label>
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <option key={num} value={num}>
                    {num} passager{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Cabin Class */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Classe
              </label>
              <select
                name="cabinClass"
                value={formData.cabinClass}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
              >
                <option value="economy">Économique</option>
                <option value="business">Affaires</option>
                <option value="first">Première classe</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-main text-white py-3 rounded-lg hover:bg-blue-main transition-colors flex items-center justify-center space-x-2 font-semibold"
              >
                <Search className="w-5 h-5" />
                <span>Rechercher</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
