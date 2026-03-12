"use client";

// Hydration-safe Travel State Management Hook

import { useState, useEffect, useCallback } from "react";
import type { 
  Trip, 
  ItineraryEvent, 
  BudgetItem, 
  PackingItem, 
  JournalEntry,
  TripStats,
  BudgetCategory,
  PackingCategory,
} from "@/types/travel";
import { BUDGET_CATEGORIES } from "@/types/travel";
import { TravelStorage } from "@/lib/travel-storage";
import { 
  generateId, 
  getNextTrip, 
  getOngoingTrips, 
  getTripStats,
  sortTrips,
} from "@/lib/travel-utils";

// ============================================
// TRIPS HOOK
// ============================================

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    const stored = TravelStorage.getTrips();
    setTrips(sortTrips(stored));
    setIsLoaded(true);
  }, []);

  const addTrip = useCallback((tripData: Omit<Trip, "id" | "createdAt">) => {
    const newTrip: Trip = {
      ...tripData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    const updated = sortTrips([...trips, newTrip]);
    setTrips(updated);
    TravelStorage.saveTrips(updated);
    return newTrip;
  }, [trips]);

  const updateTrip = useCallback((id: string, updates: Partial<Trip>) => {
    const updated = trips.map(t => 
      t.id === id ? { ...t, ...updates } : t
    );
    setTrips(sortTrips(updated));
    TravelStorage.saveTrips(updated);
  }, [trips]);

  const deleteTrip = useCallback((id: string) => {
    const updated = trips.filter(t => t.id !== id);
    setTrips(updated);
    TravelStorage.deleteTrip(id);
  }, [trips]);

  const getTrip = useCallback((id: string) => {
    return trips.find(t => t.id === id);
  }, [trips]);

  // Computed values
  const nextTrip = getNextTrip(trips);
  const ongoingTrips = getOngoingTrips(trips);
  const stats: TripStats = getTripStats(trips);

  return {
    trips,
    isLoaded,
    addTrip,
    updateTrip,
    deleteTrip,
    getTrip,
    nextTrip,
    ongoingTrips,
    stats,
  };
}

// ============================================
// ITINERARY EVENTS HOOK
// ============================================

export function useItinerary(tripId: string) {
  const [events, setEvents] = useState<ItineraryEvent[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = TravelStorage.getTripEvents(tripId);
    setEvents(stored.sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day;
      if (!a.startTime || !b.startTime) return 0;
      return a.startTime.localeCompare(b.startTime);
    }));
    setIsLoaded(true);
  }, [tripId]);

  const addEvent = useCallback((eventData: Omit<ItineraryEvent, "id">) => {
    const newEvent: ItineraryEvent = {
      ...eventData,
      id: generateId(),
    };
    const updated = [...events, newEvent].sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day;
      if (!a.startTime || !b.startTime) return 0;
      return a.startTime.localeCompare(b.startTime);
    });
    setEvents(updated);
    TravelStorage.addEvent(newEvent);
    return newEvent;
  }, [events]);

  const updateEvent = useCallback((id: string, updates: Partial<ItineraryEvent>) => {
    const updated = events.map(e => 
      e.id === id ? { ...e, ...updates } : e
    );
    setEvents(updated);
    TravelStorage.updateEvent(id, updates);
  }, [events]);

  const deleteEvent = useCallback((id: string) => {
    const updated = events.filter(e => e.id !== id);
    setEvents(updated);
    TravelStorage.deleteEvent(id);
  }, [events]);

  const toggleEventComplete = useCallback((id: string) => {
    const event = events.find(e => e.id === id);
    if (event) {
      updateEvent(id, { completed: !event.completed });
    }
  }, [events, updateEvent]);

  // Group events by day
  const eventsByDay = events.reduce((acc, event) => {
    if (!acc[event.day]) acc[event.day] = [];
    acc[event.day].push(event);
    return acc;
  }, {} as Record<number, ItineraryEvent[]>);

  // Calculate total cost
  const totalCost = events.reduce((sum, e) => sum + e.cost, 0);

  return {
    events,
    eventsByDay,
    isLoaded,
    addEvent,
    updateEvent,
    deleteEvent,
    toggleEventComplete,
    totalCost,
  };
}

// ============================================
// BUDGET HOOK
// ============================================

export function useBudget(tripId: string, tripTotalBudget?: number) {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = TravelStorage.getTripBudget(tripId);
    
    // Initialize with all categories if empty
    if (stored.length === 0) {
      const defaultItems: BudgetItem[] = BUDGET_CATEGORIES.map(cat => ({
        tripId,
        category: cat.value,
        budgeted: 0,
        actual: 0,
      }));
      setItems(defaultItems);
      TravelStorage.saveBudgetItems(defaultItems);
    } else {
      setItems(stored);
    }
    setIsLoaded(true);
  }, [tripId]);

  const updateBudgetItem = useCallback((category: BudgetCategory, updates: Partial<BudgetItem>) => {
    const updated = items.map(item => 
      item.category === category ? { ...item, ...updates } : item
    );
    setItems(updated);
    
    // Save to storage
    const allItems = TravelStorage.getBudgetItems();
    const otherItems = allItems.filter(b => b.tripId !== tripId);
    TravelStorage.saveBudgetItems([...otherItems, ...updated]);
  }, [items, tripId]);

  // Computed values
  const totalBudgeted = items.reduce((sum, i) => sum + i.budgeted, 0);
  const totalActual = items.reduce((sum, i) => sum + i.actual, 0);
  // isOverBudget compares against trip's total budget, not category budgets
  const budgetLimit = tripTotalBudget ?? totalBudgeted;
  const isOverBudget = totalActual > budgetLimit;
  const budgetProgress = budgetLimit > 0 ? (totalActual / budgetLimit) * 100 : 0;

  return {
    items,
    isLoaded,
    updateBudgetItem,
    totalBudgeted,
    totalActual,
    isOverBudget,
    budgetProgress,
  };
}

// ============================================
// PACKING HOOK
// ============================================

export function usePacking(tripId: string) {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = TravelStorage.getTripPacking(tripId);
    setItems(stored);
    setIsLoaded(true);
  }, [tripId]);

  const addItem = useCallback((category: PackingCategory, itemName: string) => {
    const newItem: PackingItem = {
      id: generateId(),
      tripId,
      category,
      item: itemName,
      packed: false,
    };
    const updated = [...items, newItem];
    setItems(updated);
    TravelStorage.addPackingItem(newItem);
    return newItem;
  }, [items, tripId]);

  const toggleItem = useCallback((id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      const updated = items.map(i => 
        i.id === id ? { ...i, packed: !i.packed } : i
      );
      setItems(updated);
      TravelStorage.updatePackingItem(id, { packed: !item.packed });
    }
  }, [items]);

  const deleteItem = useCallback((id: string) => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    TravelStorage.deletePackingItem(id);
  }, [items]);

  // Group by category
  const itemsByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PackingItem[]>);

  // Progress
  const totalItems = items.length;
  const packedItems = items.filter(i => i.packed).length;
  const progress = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;

  return {
    items,
    itemsByCategory,
    isLoaded,
    addItem,
    toggleItem,
    deleteItem,
    totalItems,
    packedItems,
    progress,
  };
}

// ============================================
// JOURNAL HOOK
// ============================================

export function useJournal(tripId: string) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = TravelStorage.getTripJournal(tripId);
    setEntries(stored.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
    setIsLoaded(true);
  }, [tripId]);

  const addEntry = useCallback((entryData: Omit<JournalEntry, "id">) => {
    const newEntry: JournalEntry = {
      ...entryData,
      id: generateId(),
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    TravelStorage.addJournalEntry(newEntry);
    return newEntry;
  }, [entries]);

  const updateEntry = useCallback((id: string, updates: Partial<JournalEntry>) => {
    const updated = entries.map(e => 
      e.id === id ? { ...e, ...updates } : e
    );
    setEntries(updated);
    TravelStorage.updateJournalEntry(id, updates);
  }, [entries]);

  const deleteEntry = useCallback((id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    TravelStorage.deleteJournalEntry(id);
  }, [entries]);

  return {
    entries,
    isLoaded,
    addEntry,
    updateEntry,
    deleteEntry,
  };
}
