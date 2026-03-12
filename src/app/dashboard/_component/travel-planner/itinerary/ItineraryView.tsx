"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Calendar } from "lucide-react";
import type { Trip, ItineraryEvent, EventType } from "@/types/travel";
import { useItinerary } from "@/hooks/useTravel";
import { getDuration, formatCurrency } from "@/lib/travel-utils";
import DaySection from "./DayColumn";
import EventForm from "./EventForm";
import EmptyState from "@/components/ui/EmptyState";

interface ItineraryViewProps {
  trip: Trip;
}

export default function ItineraryView({ trip }: ItineraryViewProps) {
  const { events, eventsByDay, isLoaded, addEvent, updateEvent, deleteEvent, toggleEventComplete, totalCost } = useItinerary(trip.id);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ItineraryEvent | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const tripDuration = getDuration(trip.startDate, trip.endDate);
  const days = Array.from({ length: tripDuration }, (_, i) => i + 1);

  // Calculate date for each day
  const getDayDate = (day: number): Date => {
    const date = new Date(trip.startDate);
    date.setDate(date.getDate() + day - 1);
    return date;
  };

  const handleAddEvent = (day: number) => {
    setSelectedDay(day);
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event: ItineraryEvent) => {
    setEditingEvent(event);
    setSelectedDay(event.day);
    setIsFormOpen(true);
  };

  const handleSubmitEvent = (eventData: {
    title: string;
    type: EventType;
    startTime?: string;
    endTime?: string;
    location?: string;
    cost: number;
    notes?: string;
  }) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent({
        ...eventData,
        tripId: trip.id,
        day: selectedDay,
        completed: false,
      });
    }
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  if (!isLoaded) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Itinéraire</h2>
          <p className="text-sm text-gray-500">
            {events.length} activité{events.length !== 1 ? "s" : ""} • Total: {formatCurrency(totalCost, trip.currency)}
          </p>
        </div>
        <button
          onClick={() => handleAddEvent(1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-main text-white rounded-xl text-sm font-medium hover:bg-blue-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      {events.length === 0 ? (
        <EmptyState
          icon={<Calendar className="w-8 h-8" />}
          title="Aucune activité"
          description="Planifiez votre voyage jour par jour en ajoutant des activités."
        />
      ) : (
        <div className="space-y-5">
          <AnimatePresence mode="popLayout">
            {days.map((day, index) => {
              const dayEvents = eventsByDay[day] || [];
              const dayDate = getDayDate(day);
              const dayTotal = dayEvents.reduce((sum, e) => sum + e.cost, 0);
              
              return (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <DaySection
                    day={day}
                    date={dayDate}
                    events={dayEvents}
                    currency={trip.currency}
                    dayTotal={dayTotal}
                    onAddEvent={() => handleAddEvent(day)}
                    onEditEvent={handleEditEvent}
                    onDeleteEvent={deleteEvent}
                    onToggleComplete={toggleEventComplete}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Event Form Modal */}
      <EventForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEvent(null);
        }}
        onSubmit={handleSubmitEvent}
        editEvent={editingEvent}
        day={selectedDay}
      />
    </div>
  );
}
