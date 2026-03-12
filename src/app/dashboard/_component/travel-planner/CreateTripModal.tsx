"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Modal from "@/components/ui/Modal";
import type { Trip, TripStatus } from "@/types/travel";
import { STATUS_CONFIG } from "@/types/travel";
import { getCountryOptions, CURRENCY_OPTIONS, COUNTRY_FLAGS } from "@/lib/travel-utils";

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (trip: Omit<Trip, "id" | "createdAt">) => void;
  editTrip?: Trip;
}

export default function CreateTripModal({
  isOpen,
  onClose,
  onSubmit,
  editTrip,
}: CreateTripModalProps) {
  const isEditing = !!editTrip;
  
  const [destination, setDestination] = useState(editTrip?.destination || "");
  const [country, setCountry] = useState(editTrip?.country || "");
  const [startDate, setStartDate] = useState(editTrip?.startDate?.split("T")[0] || "");
  const [endDate, setEndDate] = useState(editTrip?.endDate?.split("T")[0] || "");
  const [totalBudget, setTotalBudget] = useState(editTrip?.totalBudget?.toString() || "");
  const [currency, setCurrency] = useState(editTrip?.currency || "EUR");
  const [status, setStatus] = useState<TripStatus>(editTrip?.status || "planning");

  const countryOptions = getCountryOptions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const flag = COUNTRY_FLAGS[country] || "🌍";
    
    onSubmit({
      destination,
      country,
      countryFlag: flag,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      totalBudget: parseFloat(totalBudget) || 0,
      currency,
      status,
    });

    // Reset form if not editing
    if (!isEditing) {
      setDestination("");
      setCountry("");
      setStartDate("");
      setEndDate("");
      setTotalBudget("");
      setCurrency("EUR");
      setStatus("planning");
    }
  };

  const isValid = destination && country && startDate && endDate && new Date(startDate) <= new Date(endDate);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Modifier le voyage" : "Nouveau voyage"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Destination *
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="ex: Paris, Tokyo, New York..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
            required
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Pays *
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
            required
          >
            <option value="">Sélectionner un pays</option>
            {countryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.flag} {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Date de départ *
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Date de retour *
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
              required
            />
          </div>
        </div>

        {/* Budget */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Budget total
            </label>
            <input
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(e.target.value)}
              placeholder="0"
              min="0"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Devise
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-main focus:border-transparent outline-none transition"
            >
              {CURRENCY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Statut
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(STATUS_CONFIG) as TripStatus[]).map((s) => {
              const config = STATUS_CONFIG[s];
              const isSelected = status === s;
              
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${isSelected 
                      ? "bg-blue-main text-white ring-2 ring-blue-main ring-offset-2" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  {config.label}
                </button>
              );
            })}
          </div>
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
            {isEditing ? "Enregistrer" : "Créer le voyage"}
          </motion.button>
        </div>
      </form>
    </Modal>
  );
}
