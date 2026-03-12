"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, MapPin, Pencil, Trash2 } from "lucide-react";
import { Map, Wallet, BookOpen } from "lucide-react";
import type { Trip } from "@/types/travel";
import { formatDateRange, getDuration, formatCurrency } from "@/lib/travel-utils";
import Badge from "@/components/ui/Badge";
import Tabs from "@/components/ui/Tabs";
import ConfirmModal from "@/components/ui/ConfirmModal";
import CreateTripModal from "./CreateTripModal";
import ItineraryView from "./itinerary/ItineraryView";
import BudgetTracker from "./budget/BudgetTracker";
import JournalList from "./journal/JournalList";

interface TripDetailProps {
  trip: Trip;
  onBack: () => void;
  onUpdate: (updates: Partial<Trip>) => void;
  onDelete: () => void;
}

type TabId = "itinerary" | "budget" | "journal";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "itinerary", label: "Itinéraire", icon: <Map className="w-4 h-4" /> },
  { id: "budget", label: "Budget", icon: <Wallet className="w-4 h-4" /> },
  { id: "journal", label: "Journal", icon: <BookOpen className="w-4 h-4" /> },
];

export default function TripDetail({ trip, onBack, onUpdate, onDelete }: TripDetailProps) {
  const [activeTab, setActiveTab] = useState<TabId>("itinerary");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const duration = getDuration(trip.startDate, trip.endDate);

  const handleUpdate = (updates: Omit<Trip, "id" | "createdAt">) => {
    onUpdate(updates);
    setIsEditModalOpen(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "itinerary":
        return <ItineraryView trip={trip} />;
      case "budget":
        return <BudgetTracker trip={trip} />;
      case "journal":
        return <JournalList tripId={trip.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Retour aux voyages</span>
      </motion.button>

      {/* Trip Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Trip info */}
          <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
            <span className="text-3xl sm:text-4xl flex-shrink-0">{trip.countryFlag}</span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                  {trip.destination}
                </h1>
                <Badge status={trip.status} />
              </div>
              
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                {trip.country}
              </p>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400" />
                  {formatDateRange(trip.startDate, trip.endDate)}
                </span>
                <span className="hidden sm:inline text-gray-300">•</span>
                <span>{duration} jour{duration > 1 ? "s" : ""}</span>
                <span className="hidden sm:inline text-gray-300">•</span>
                <span className="font-medium text-blue-main">
                  {formatCurrency(trip.totalBudget, trip.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors"
              title="Modifier"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-red-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as TabId)}
      />

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full overflow-hidden"
      >
        {renderTabContent()}
      </motion.div>

      {/* Edit Modal */}
      <CreateTripModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdate}
        editTrip={trip}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onDelete}
        title="Supprimer ce voyage ?"
        message="Cette action est irréversible. Toutes les données liées à ce voyage (itinéraire, budget, checklist, journal) seront supprimées."
        confirmLabel="Supprimer"
        variant="danger"
      />
    </div>
  );
}
