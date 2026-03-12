"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plane, Bed, Ticket, Utensils, ShoppingBag, Car, MoreHorizontal, AlertTriangle } from "lucide-react";
import type { Trip, BudgetCategory, BudgetItem } from "@/types/travel";
import { BUDGET_CATEGORIES } from "@/types/travel";
import { useBudget } from "@/hooks/useTravel";
import { formatCurrency, getCurrencySymbol } from "@/lib/travel-utils";
import ProgressBar from "@/components/ui/ProgressBar";

interface BudgetTrackerProps {
  trip: Trip;
}

const CATEGORY_ICONS: Record<BudgetCategory, React.ReactNode> = {
  flights: <Plane className="w-4 h-4" />,
  accommodation: <Bed className="w-4 h-4" />,
  activities: <Ticket className="w-4 h-4" />,
  food: <Utensils className="w-4 h-4" />,
  shopping: <ShoppingBag className="w-4 h-4" />,
  transport: <Car className="w-4 h-4" />,
  other: <MoreHorizontal className="w-4 h-4" />,
};

export default function BudgetTracker({ trip }: BudgetTrackerProps) {
  const { items, isLoaded, updateBudgetItem, totalBudgeted, totalActual, isOverBudget, budgetProgress } = useBudget(trip.id, trip.totalBudget);

  if (!isLoaded) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-24 bg-gray-200 rounded-xl" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 ${
          isOverBudget 
            ? "bg-red-50 border border-red-200" 
            : "bg-blue-50 border border-blue-100"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <p className={`text-sm font-medium ${isOverBudget ? "text-red-600" : "text-blue-600"}`}>
              Budget total
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(totalActual, trip.currency)}
              <span className="text-lg font-normal text-gray-500">
                {" "}/ {formatCurrency(trip.totalBudget, trip.currency)}
              </span>
            </p>
          </div>
          
          {isOverBudget && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-red-600">
                Budget dépassé de {formatCurrency(totalActual - trip.totalBudget, trip.currency)}
              </span>
            </div>
          )}
        </div>

        <ProgressBar 
          value={totalActual} 
          max={trip.totalBudget} 
          size="md" 
        />
        
        <p className="text-xs text-gray-500 mt-2">
          {budgetProgress.toFixed(0)}% du budget utilisé
        </p>
      </motion.div>

      {/* Budget Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-5">Catégorie</div>
          <div className="col-span-3 text-right">Prévu</div>
          <div className="col-span-3 text-right">Dépensé</div>
          <div className="col-span-1"></div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-100">
          {items.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <BudgetRow
                item={item}
                currency={trip.currency}
                onUpdate={(updates) => updateBudgetItem(item.category, updates)}
              />
            </motion.div>
          ))}
        </div>

        {/* Totals */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-t border-gray-200 font-semibold">
          <div className="col-span-5 text-gray-900">Total</div>
          <div className="col-span-3 text-right text-gray-900">
            {formatCurrency(totalBudgeted, trip.currency)}
          </div>
          <div className={`col-span-3 text-right ${isOverBudget ? "text-red-600" : "text-gray-900"}`}>
            {formatCurrency(totalActual, trip.currency)}
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>

      {/* Tip */}
      <p className="text-xs text-gray-400 text-center">
        Cliquez sur un montant pour le modifier
      </p>
    </div>
  );
}

// Budget Row Component with inline editing
interface BudgetRowProps {
  item: BudgetItem;
  currency: string;
  onUpdate: (updates: Partial<BudgetItem>) => void;
}

function BudgetRow({ item, currency, onUpdate }: BudgetRowProps) {
  const [editingField, setEditingField] = useState<"budgeted" | "actual" | null>(null);
  const [editValue, setEditValue] = useState("");

  const categoryConfig = BUDGET_CATEGORIES.find(c => c.value === item.category);
  const isOverspent = item.actual > item.budgeted && item.budgeted > 0;
  const progress = item.budgeted > 0 ? (item.actual / item.budgeted) * 100 : 0;

  const handleStartEdit = (field: "budgeted" | "actual") => {
    setEditingField(field);
    setEditValue(item[field].toString());
  };

  const handleSave = () => {
    if (editingField) {
      const value = parseFloat(editValue) || 0;
      onUpdate({ [editingField]: value });
    }
    setEditingField(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditingField(null);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-gray-50 transition-colors">
      {/* Category */}
      <div className="col-span-5 flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          isOverspent ? "bg-red-100 text-red-500" : "bg-blue-main/10 text-blue-main"
        }`}>
          {CATEGORY_ICONS[item.category]}
        </div>
        <span className="text-sm font-medium text-gray-900">
          {categoryConfig?.label || item.category}
        </span>
      </div>

      {/* Budgeted */}
      <div className="col-span-3 text-right">
        {editingField === "budgeted" ? (
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 text-right text-sm border border-blue-main rounded focus:outline-none focus:ring-2 focus:ring-blue-main"
            autoFocus
          />
        ) : (
          <button
            onClick={() => handleStartEdit("budgeted")}
            className="text-sm text-gray-600 hover:text-blue-main hover:bg-blue-50 px-2 py-1 rounded transition-colors"
          >
            {formatCurrency(item.budgeted, currency)}
          </button>
        )}
      </div>

      {/* Actual */}
      <div className="col-span-3 text-right">
        {editingField === "actual" ? (
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 text-right text-sm border border-blue-main rounded focus:outline-none focus:ring-2 focus:ring-blue-main"
            autoFocus
          />
        ) : (
          <button
            onClick={() => handleStartEdit("actual")}
            className={`text-sm px-2 py-1 rounded transition-colors ${
              isOverspent 
                ? "text-red-600 hover:bg-red-50" 
                : "text-gray-900 hover:text-blue-main hover:bg-blue-50"
            }`}
          >
            {formatCurrency(item.actual, currency)}
          </button>
        )}
      </div>

      {/* Progress indicator */}
      <div className="col-span-1">
        {item.budgeted > 0 && (
          <div 
            className={`w-2 h-2 rounded-full ${
              progress > 100 ? "bg-red-500" : progress > 75 ? "bg-amber-500" : "bg-emerald-500"
            }`}
            title={`${progress.toFixed(0)}%`}
          />
        )}
      </div>
    </div>
  );
}
