"use client";

import { motion } from "motion/react";
import { Calendar, MapPin } from "lucide-react";
import type { Trip } from "@/types/travel";
import { formatDateRange, getDuration, formatCurrency } from "@/lib/travel-utils";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { useBudget } from "@/hooks/useTravel";

interface TripCardProps {
  trip: Trip;
  onClick: () => void;
}

export default function TripCard({ trip, onClick }: TripCardProps) {
  const { totalActual, isLoaded: budgetLoaded } = useBudget(trip.id);
  const duration = getDuration(trip.startDate, trip.endDate);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 cursor-pointer hover:shadow-xl transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{trip.countryFlag}</span>
          <div>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
              {trip.destination}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {trip.country}
            </p>
          </div>
        </div>
        <Badge status={trip.status} />
      </div>

      {/* Date info */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <Calendar className="w-4 h-4 text-gray-400" />
        <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
        <span className="text-gray-300">•</span>
        <span className="text-gray-500">{duration} jour{duration > 1 ? "s" : ""}</span>
      </div>

      {/* Budget progress */}
      <div className="pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Budget</span>
          <span className="text-xs font-medium text-gray-700">
            {budgetLoaded 
              ? `${formatCurrency(totalActual, trip.currency)} / ${formatCurrency(trip.totalBudget, trip.currency)}`
              : "..."
            }
          </span>
        </div>
        <ProgressBar 
          value={budgetLoaded ? totalActual : 0} 
          max={trip.totalBudget} 
          size="sm" 
        />
      </div>
    </motion.div>
  );
}
