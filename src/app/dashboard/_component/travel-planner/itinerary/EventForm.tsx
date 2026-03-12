"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Plane, Bed, Ticket, Utensils, Car, MoreHorizontal } from "lucide-react";
import Modal from "@/components/ui/Modal";
import type { ItineraryEvent, EventType } from "@/types/travel";
import { EVENT_TYPE_CONFIG } from "@/types/travel";

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: {
    title: string;
    type: EventType;
    startTime?: string;
    endTime?: string;
    location?: string;
    cost: number;
    notes?: string;
  }) => void;
  editEvent?: ItineraryEvent | null;
  day: number;
}

const EVENT_TYPE_ICONS: Record<EventType, React.ReactNode> = {
  flight: <Plane className="w-5 h-5" />,
  hotel: <Bed className="w-5 h-5" />,
  activity: <Ticket className="w-5 h-5" />,
  restaurant: <Utensils className="w-5 h-5" />,
  transport: <Car className="w-5 h-5" />,
  other: <MoreHorizontal className="w-5 h-5" />,
};

export default function EventForm({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editEvent,
  day 
}: EventFormProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<EventType>("activity");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [notes, setNotes] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (editEvent) {
      setTitle(editEvent.title);
      setType(editEvent.type);
      setStartTime(editEvent.startTime || "");
      setEndTime(editEvent.endTime || "");
      setLocation(editEvent.location || "");
      setCost(editEvent.cost?.toString() || "");
      setNotes(editEvent.notes || "");
    } else {
      // Reset form
      setTitle("");
      setType("activity");
      setStartTime("");
      setEndTime("");
      setLocation("");
      setCost("");
      setNotes("");
    }
  }, [editEvent, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      title,
      type,
      startTime: startTime || undefined,
      endTime: endTime || undefined,
      location: location || undefined,
      cost: parseFloat(cost) || 0,
      notes: notes || undefined,
    });
  };

  const isValid = title.trim().length > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editEvent ? "Modifier l'activité" : `Nouvelle activité - Jour ${day}`}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {(Object.keys(EVENT_TYPE_CONFIG) as EventType[]).map((t) => {
              const config = EVENT_TYPE_CONFIG[t];
              const isSelected = type === t;
              
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`
                    flex flex-col items-center gap-1 p-3 rounded-xl transition-all
                    ${isSelected 
                      ? "bg-blue-main text-white ring-2 ring-blue-main ring-offset-2" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  {EVENT_TYPE_ICONS[t]}
                  <span className="text-[10px] font-medium">{config.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Titre *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ex: Visite du musée, Déjeuner au restaurant..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
            required
          />
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Heure de début
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Heure de fin
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Lieu
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="ex: Tour Eiffel, Aéroport CDG..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
          />
        </div>

        {/* Cost */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Coût estimé
          </label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="0"
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Détails supplémentaires..."
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
          <motion.button
            type="submit"
            disabled={!isValid}
            whileHover={{ scale: isValid ? 1.01 : 1 }}
            whileTap={{ scale: isValid ? 0.98 : 1 }}
            className={`
              flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-colors
              ${isValid 
                ? "bg-blue-main text-white hover:bg-blue-dark" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {editEvent ? "Enregistrer" : "Ajouter"}
          </motion.button>
        </div>
      </form>
    </Modal>
  );
}
