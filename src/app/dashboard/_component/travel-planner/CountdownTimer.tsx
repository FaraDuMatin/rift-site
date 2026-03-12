"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Plane } from "lucide-react";
import type { Trip, Countdown } from "@/types/travel";
import { calculateCountdown } from "@/lib/travel-utils";

interface CountdownTimerProps {
  trip: Trip;
}

export default function CountdownTimer({ trip }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState<Countdown>(() => 
    calculateCountdown(trip.startDate)
  );

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(trip.startDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [trip.startDate]);

  if (countdown.isOverdue) {
    return null; // Don't show countdown if trip has started
  }

  const timeUnits = [
    { value: countdown.months, label: "Mois", show: countdown.months > 0 },
    { value: countdown.weeks, label: "Sem.", show: true },
    { value: countdown.days, label: "Jours", show: true },
    { value: countdown.hours, label: "Heures", show: true },
    { value: countdown.minutes, label: "Min", show: true },
    { value: countdown.seconds, label: "Sec", show: true },
  ].filter(unit => unit.show);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-linear-to-br from-blue-main to-blue-dark rounded-2xl p-6 text-white"
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Plane className="w-5 h-5" />
        <span className="text-sm font-medium opacity-90">Prochain voyage</span>
      </div>

      {/* Destination */}
      <div className="text-center mb-5">
        <span className="text-2xl mr-2">{trip.countryFlag}</span>
        <span className="text-xl font-bold">{trip.destination}</span>
      </div>

      {/* Countdown units */}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center gap-2 sm:gap-3">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-4 sm:py-3 min-w-12 sm:min-w-14">
                <span className="text-xl sm:text-2xl font-bold tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs opacity-80 mt-1 block">
                {unit.label}
              </span>
            </div>
            
            {index < timeUnits.length - 1 && (
              <span className="text-xl font-bold opacity-50 hidden sm:block">:</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
