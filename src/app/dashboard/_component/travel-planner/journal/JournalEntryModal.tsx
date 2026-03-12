"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, Star } from "lucide-react";
import type { JournalEntry, Mood } from "@/types/travel";
import { MOOD_OPTIONS } from "@/types/travel";
import Modal from "@/components/ui/Modal";

interface JournalEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<JournalEntry, "id" | "tripId">) => void;
  initialData?: JournalEntry | null;
}

export default function JournalEntryModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData 
}: JournalEntryModalProps) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<Mood>("happy");
  const [rating, setRating] = useState(0);
  const [location, setLocation] = useState("");

  // Reset form when modal opens/changes
  useEffect(() => {
    if (initialData) {
      setDate(initialData.date);
      setTitle(initialData.title || "");
      setContent(initialData.content);
      setMood(initialData.mood || "happy");
      setRating(initialData.rating || 0);
      setLocation(initialData.location || "");
    } else {
      setDate(new Date().toISOString().split("T")[0]);
      setTitle("");
      setContent("");
      setMood("happy");
      setRating(0);
      setLocation("");
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSave({
      date,
      title: title.trim() || undefined,
      content: content.trim(),
      mood,
      rating,
      location: location.trim() || undefined,
    });
  };

  const isEditing = !!initialData;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            {isEditing ? "Modifier l'entrée" : "Nouvelle entrée"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
          />
        </div>

        {/* Title (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre <span className="text-gray-400 font-normal">(optionnel)</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Visite du musée du Louvre"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
          />
        </div>

        {/* Mood */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Humeur
          </label>
          <div className="flex gap-2">
            {MOOD_OPTIONS.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMood(m.value)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border transition-all ${
                  mood === m.value
                    ? "border-blue-main bg-blue-50 ring-2 ring-blue-main/20"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                title={m.label}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-xs text-gray-500">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contenu
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Qu'avez-vous fait aujourd'hui? Quelles sont vos impressions?"
            rows={5}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition resize-none"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note de la journée
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                onClick={() => setRating(rating === star ? 0 : star)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-1"
              >
                <Star
                  className={`w-7 h-7 transition-colors ${
                    star <= rating
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-300 hover:text-amber-200"
                  }`}
                />
              </motion.button>
            ))}
            {rating > 0 && (
              <span className="text-sm text-gray-500 ml-2">{rating}/5</span>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lieu <span className="text-gray-400 font-normal">(optionnel)</span>
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ex: Paris, France"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={!content.trim()}
            className="flex-1 py-3 px-4 bg-blue-main text-white rounded-xl text-sm font-semibold hover:bg-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEditing ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
