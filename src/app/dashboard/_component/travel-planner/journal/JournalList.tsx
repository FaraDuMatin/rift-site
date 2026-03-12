"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Calendar, Star, Edit2, Trash2, BookOpen } from "lucide-react";
import type { JournalEntry } from "@/types/travel";
import { MOOD_EMOJI, MOOD_LABELS } from "@/types/travel";
import { useJournal } from "@/hooks/useTravel";
import EmptyState from "@/components/ui/EmptyState";
import ConfirmModal from "@/components/ui/ConfirmModal";
import JournalEntryModal from "./JournalEntryModal";

interface JournalListProps {
  tripId: string;
}

export default function JournalList({ tripId }: JournalListProps) {
  const { entries, isLoaded, addEntry, updateEntry, deleteEntry } = useJournal(tripId);
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleSave = (data: Omit<JournalEntry, "id" | "tripId">) => {
    if (editingEntry) {
      updateEntry(editingEntry.id, data);
    } else {
      addEntry({ ...data, tripId });
    }
    setEditingEntry(null);
    setShowModal(false);
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    deleteEntry(id);
    setDeleteConfirm(null);
  };

  const handleClose = () => {
    setEditingEntry(null);
    setShowModal(false);
  };

  if (!isLoaded) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-xl" />
        ))}
      </div>
    );
  }

  // Sort entries by date descending
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      {/* Add Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setShowModal(true)}
        className="w-full py-3 px-4 bg-blue-main text-white rounded-xl text-sm font-semibold hover:bg-blue-dark transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Ajouter une entrée
      </motion.button>

      {/* Entries */}
      {sortedEntries.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-8 h-8" />}
          title="Aucune entrée"
          description="Commencez à documenter vos expériences de voyage!"
        />
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {sortedEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <JournalCard
                  entry={entry}
                  onEdit={() => handleEdit(entry)}
                  onDelete={() => setDeleteConfirm(entry.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Entry Modal */}
      <JournalEntryModal
        isOpen={showModal}
        onClose={handleClose}
        onSave={handleSave}
        initialData={editingEntry}
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={deleteConfirm !== null}
        title="Supprimer l'entrée"
        message="Êtes-vous sûr de vouloir supprimer cette entrée? Cette action est irréversible."
        confirmLabel="Supprimer"
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
        onClose={() => setDeleteConfirm(null)}
      />
    </div>
  );
}

// Journal Card Component
interface JournalCardProps {
  entry: JournalEntry;
  onEdit: () => void;
  onDelete: () => void;
}

function JournalCard({ entry, onEdit, onDelete }: JournalCardProps) {
  const formattedDate = new Date(entry.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const mood = entry.mood || "neutral";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-xl transition-shadow group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Mood */}
          <span className="text-2xl" title={MOOD_LABELS[mood]}>
            {MOOD_EMOJI[mood]}
          </span>
          
          {/* Date */}
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </div>
            {entry.title && (
              <h3 className="text-sm font-semibold text-gray-900 mt-0.5">
                {entry.title}
              </h3>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-main hover:bg-blue-50 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
        {entry.content}
      </p>

      {/* Rating */}
      {entry.rating && entry.rating > 0 && (
        <div className="flex items-center gap-1 mt-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= (entry.rating || 0)
                  ? "text-amber-400 fill-amber-400" 
                  : "text-gray-200"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">{entry.rating}/5</span>
        </div>
      )}

      {/* Location */}
      {entry.location && (
        <p className="text-xs text-gray-400 mt-2">
          📍 {entry.location}
        </p>
      )}
    </div>
  );
}
