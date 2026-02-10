'use client';

import { Plane, Clock, ArrowRight, Frown } from 'lucide-react';
import { Flight, formatTime, formatDate, calculateDuration } from '../lib/flightService';
import ContactForm from '@/components/ui/ContactForm';

interface FlightResultsProps {
  flights: Flight[];
  hasSearched: boolean;
}

export default function FlightResults({ flights, hasSearched }: FlightResultsProps) {
  if (!hasSearched) return null;

  if (flights.length === 0) {
    return (
      <div className="mt-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8">
          <Frown className="w-16 h-16 mx-auto text-blue-light mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Désolé, nous n&apos;avons pas trouvé de vols
          </h3>
          <p className="text-gray-600 mb-6">
            Vous pouvez nous contacter pour recevoir une aide personnalisée
          </p>
        </div>
        <ContactForm />
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {flights.length} vol{flights.length > 1 ? 's' : ''} trouvé{flights.length > 1 ? 's' : ''}
      </h3>
      {flights.map((flight) => (
        <div
          key={flight.id}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Flight Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">{formatTime(flight.local_departure)}</p>
                  <p className="text-sm text-gray-500">{flight.cityFrom}</p>
                </div>
                
                <div className="flex-1 flex flex-col items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{calculateDuration(flight.local_departure, flight.local_arrival)}</span>
                  </div>
                  <div className="w-full flex items-center gap-2">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <Plane className="w-4 h-4 text-blue-main" />
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>
                  <p className="text-xs text-gray-400">
                    {flight.route[0]?.airline} {flight.route[0]?.flight_no}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">{formatTime(flight.local_arrival)}</p>
                  <p className="text-sm text-gray-500">{flight.cityTo}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">{formatDate(flight.local_departure)}</p>
            </div>

            {/* Price and Book */}
            <div className="flex items-center gap-4 md:border-l md:pl-6">
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-main">{flight.price} €</p>
                <p className="text-xs text-gray-500">par personne</p>
              </div>
              <button className="bg-blue-main text-white px-6 py-3 rounded-lg hover:bg-blue-dark transition-colors font-semibold">
                Réserver
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
