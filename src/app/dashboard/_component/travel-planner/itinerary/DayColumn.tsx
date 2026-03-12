"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, ChevronDown, Clock, MapPin, Check, Trash2, Pencil } from "lucide-react";
import { Plane, Bed, Ticket, Utensils, Car, MoreHorizontal } from "lucide-react";
import type { ItineraryEvent, EventType } from "@/types/travel";
import { formatCurrency } from "@/lib/travel-utils";

interface DaySectionProps {
  day: number;
  date: Date;
  events: ItineraryEvent[];
  currency: string;
  dayTotal: number;
  onAddEvent: () => void;
  onEditEvent: (event: ItineraryEvent) => void;
  onDeleteEvent: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const EVENT_ICONS: Record<EventType, React.ReactNode> = {
  flight: <Plane className="w-4 h-4" />,
  hotel: <Bed className="w-4 h-4" />,
  activity: <Ticket className="w-4 h-4" />,
  restaurant: <Utensils className="w-4 h-4" />,
  transport: <Car className="w-4 h-4" />,
  other: <MoreHorizontal className="w-4 h-4" />,
};

const EVENT_COLORS: Record<EventType, string> = {
  flight: "bg-blue-100 text-blue-600",
  hotel: "bg-purple-100 text-purple-600",
  activity: "bg-emerald-100 text-emerald-600",
  restaurant: "bg-amber-100 text-amber-600",
  transport: "bg-cyan-100 text-cyan-600",
  other: "bg-gray-100 text-gray-600",
};

const DAY_COLORS = [
  "bg-emerald-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-orange-500",
];

export default function DaySection({
  day,
  date,
  events,
  currency,
  dayTotal,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  onToggleComplete,
}: DaySectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const colorClass = DAY_COLORS[(day - 1) % DAY_COLORS.length];
  const formattedDate = date.toLocaleDateString("fr-FR", { 
    weekday: "long", 
    day: "numeric", 
    month: "long" 
  });

  // Sort events by start time
  const sortedEvents = [...events].sort((a, b) => {
    if (!a.startTime && !b.startTime) return 0;
    if (!a.startTime) return 1;
    if (!b.startTime) return -1;
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header - Clickable to expand/collapse */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 sm:px-6 hover:bg-gray-50/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Day badge */}
          <span className={`shrink-0 px-3 py-1.5 ${colorClass} text-white text-xs sm:text-sm font-bold rounded-lg`}>
            J{day}
          </span>
          
          {/* Date */}
          <div>
            <span className="text-sm sm:text-base font-medium text-gray-900 capitalize">
              {formattedDate}
            </span>
            <span className="block sm:inline sm:ml-2 text-xs text-gray-400">
              {events.length} activité{events.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {dayTotal > 0 && (
            <span className="text-sm font-semibold text-gray-700">
              {formatCurrency(dayTotal, currency)}
            </span>
          )}
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} 
          />
        </div>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-2 space-y-3">
              {/* Events list */}
              {sortedEvents.length > 0 ? (
                <div className="space-y-3">
                  {sortedEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <EventCard
                        event={event}
                        currency={currency}
                        onEdit={() => onEditEvent(event)}
                        onDelete={() => onDeleteEvent(event.id)}
                        onToggleComplete={() => onToggleComplete(event.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">
                  Aucune activité prévue
                </p>
              )}

              {/* Add button */}
              <button
                onClick={onAddEvent}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-gray-500 hover:text-blue-main hover:bg-blue-50 rounded-xl border border-dashed border-gray-200 hover:border-blue-main transition-colors"
              >
                <Plus className="w-4 h-4" />
                Ajouter une activité
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Event Card Component
interface EventCardProps {
  event: ItineraryEvent;
  currency: string;
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

function EventCard({ event, currency, onEdit, onDelete, onToggleComplete }: EventCardProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className={`relative p-4 rounded-xl border transition-all ${
        event.completed 
          ? "bg-gray-50 border-gray-100" 
          : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Complete checkbox */}
        <button
          onClick={onToggleComplete}
          className={`shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border-2 transition-colors ${
            event.completed 
              ? "bg-emerald-500 border-emerald-500 text-white" 
              : "border-gray-300 hover:border-blue-main"
          }`}
        >
          {event.completed && <Check className="w-3 h-3" />}
        </button>

        {/* Event content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {/* Event type badge */}
            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${EVENT_COLORS[event.type]}`}>
              {EVENT_ICONS[event.type]}
              <span className="hidden sm:inline">{getEventTypeLabel(event.type)}</span>
            </span>
            
            {/* Title */}
            <span className={`text-sm sm:text-base font-medium ${
              event.completed ? "line-through text-gray-400" : "text-gray-900"
            }`}>
              {event.title}
            </span>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-500">
            {event.startTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {event.startTime}
                {event.endTime && ` → ${event.endTime}`}
              </span>
            )}
            {event.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate max-w-[150px] sm:max-w-[200px]">{event.location}</span>
              </span>
            )}
            {event.cost > 0 && (
              <span className="font-semibold text-blue-main">
                {formatCurrency(event.cost, currency)}
              </span>
            )}
          </div>

          {/* Notes */}
          {event.notes && (
            <p className="mt-2 text-xs text-gray-400 line-clamp-2">
              {event.notes}
            </p>
          )}
        </div>

        {/* Action buttons - Always visible on mobile via tap, hover on desktop */}
        <div className={`shrink-0 flex gap-1 transition-opacity ${
          showActions ? "opacity-100" : "opacity-0 sm:group-hover:opacity-100"
        }`}>
          <button
            onClick={onEdit}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-main hover:bg-blue-50 transition-colors"
            title="Modifier"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function getEventTypeLabel(type: EventType): string {
  const labels: Record<EventType, string> = {
    flight: "Vol",
    hotel: "Hôtel",
    activity: "Activité",
    restaurant: "Restaurant",
    transport: "Transport",
    other: "Autre",
  };
  return labels[type];
}
