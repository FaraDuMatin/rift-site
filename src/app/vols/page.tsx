'use client';

import { Plane } from 'lucide-react';
import FlightSearch from './_component/FlightSearch';

export default function VolsPage() {
  return (
    <section className="min-h-screen/2 bg-gray-50">
      {/* Hero Header */}
      <div className="relative bg-linear-to-t from-blue-light/30 via-blue-main to-blue-dark text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <Plane className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Réservation de Billets d&apos;Avion
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Trouvez et réservez les meilleurs vols vers l&apos;Afrique de l&apos;Est aux tarifs les plus compétitifs
            </p>
          </div>
        </div>
      </div>

      {/* Flight Search Component */}
      <FlightSearch />
    </section>
  );
}
