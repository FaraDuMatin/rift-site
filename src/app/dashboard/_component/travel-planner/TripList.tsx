"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Plane } from "lucide-react";
import type { Trip, TripStatus, TripStats } from "@/types/travel";
import { filterTripsByStatus } from "@/lib/travel-utils";
import TripCard from "./TripCard";
import CountdownTimer from "./CountdownTimer";
import CreateTripModal from "./CreateTripModal";
import EmptyState from "@/components/ui/EmptyState";

interface TripListProps {
  trips: Trip[];
  nextTrip: Trip | null;
  stats: TripStats;
  onSelectTrip: (id: string) => void;
  onAddTrip: (trip: Omit<Trip, "id" | "createdAt">) => Trip;
}

type FilterTab = "all" | TripStatus;

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "planning", label: "Planification" },
  { id: "booked", label: "Réservés" },
  { id: "ongoing", label: "En cours" },
  { id: "completed", label: "Terminés" },
];

export default function TripList({ 
  trips, 
  nextTrip, 
  stats,
  onSelectTrip, 
  onAddTrip 
}: TripListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTrips = filterTripsByStatus(trips, activeFilter);

  const getTabCount = (tab: FilterTab): number => {
    if (tab === "all") return stats.total;
    return stats[tab];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Mes Voyages
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {stats.total} voyage{stats.total !== 1 ? "s" : ""} au total
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-blue-main text-white rounded-xl text-sm font-semibold hover:bg-blue-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouveau voyage
        </motion.button>
      </div>

      {/* Countdown Timer (if upcoming trip exists) */}
      {nextTrip && <CountdownTimer trip={nextTrip} />}

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab.id;
          const count = getTabCount(tab.id);
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors
                ${isActive 
                  ? "bg-blue-main text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              {tab.label}
              {count > 0 && (
                <span className={`
                  px-1.5 py-0.5 text-xs rounded-full
                  ${isActive ? "bg-white/20" : "bg-gray-200"}
                `}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Trip Grid */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TripCard 
                trip={trip} 
                onClick={() => onSelectTrip(trip.id)} 
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Plane className="w-8 h-8" />}
          title={activeFilter === "all" ? "Aucun voyage" : `Aucun voyage ${FILTER_TABS.find(t => t.id === activeFilter)?.label.toLowerCase()}`}
          description="Commencez à planifier votre prochaine aventure !"
          action={{
            label: "Créer un voyage",
            onClick: () => setIsModalOpen(true),
          }}
        />
      )}

      {/* Create Trip Modal */}
      <CreateTripModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(tripData) => {
          onAddTrip(tripData);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
