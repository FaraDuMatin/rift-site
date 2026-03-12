"use client";

import { useState } from "react";
import { useTrips } from "@/hooks/useTravel";
import TripList from "./TripList";
import TripDetail from "./TripDetail";

export default function TravelPlannerMain() {
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const { trips, isLoaded, addTrip, updateTrip, deleteTrip, nextTrip, stats } = useTrips();

  // Show skeleton while loading
  if (!isLoaded) {
    return <TravelPlannerSkeleton />;
  }

  // Show trip detail view
  if (selectedTripId) {
    const trip = trips.find(t => t.id === selectedTripId);
    if (trip) {
      return (
        <TripDetail
          trip={trip}
          onBack={() => setSelectedTripId(null)}
          onUpdate={(updates) => updateTrip(selectedTripId, updates)}
          onDelete={() => {
            deleteTrip(selectedTripId);
            setSelectedTripId(null);
          }}
        />
      );
    }
  }

  // Show trip list
  return (
    <TripList
      trips={trips}
      nextTrip={nextTrip}
      stats={stats}
      onSelectTrip={setSelectedTripId}
      onAddTrip={addTrip}
    />
  );
}

function TravelPlannerSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-gray-200 rounded-lg" />
        <div className="h-10 w-32 bg-gray-200 rounded-xl" />
      </div>

      {/* Countdown skeleton */}
      <div className="h-32 bg-gray-200 rounded-2xl" />

      {/* Tabs skeleton */}
      <div className="h-12 w-80 bg-gray-200 rounded-xl" />

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
