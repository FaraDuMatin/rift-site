// Travel Storage Service - localStorage abstraction for easy DB migration later

import type { 
  Trip, 
  ItineraryEvent, 
  BudgetItem, 
  PackingItem, 
  JournalEntry 
} from "@/types/travel";

const STORAGE_KEYS = {
  TRIPS: "rift_trips",
  EVENTS: "rift_itinerary_events",
  BUDGET: "rift_budget_items",
  PACKING: "rift_packing_items",
  JOURNAL: "rift_journal_entries",
} as const;

// Helper to safely parse JSON
function safeJsonParse<T>(json: string | null, fallback: T): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

// Helper to check if we're in browser
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// ============================================
// TRIPS
// ============================================

export function getTrips(): Trip[] {
  if (!isBrowser()) return [];
  return safeJsonParse(localStorage.getItem(STORAGE_KEYS.TRIPS), []);
}

export function saveTrips(trips: Trip[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));
}

export function getTrip(id: string): Trip | undefined {
  return getTrips().find(t => t.id === id);
}

export function addTrip(trip: Trip): void {
  const trips = getTrips();
  trips.push(trip);
  saveTrips(trips);
}

export function updateTrip(id: string, updates: Partial<Trip>): void {
  const trips = getTrips();
  const index = trips.findIndex(t => t.id === id);
  if (index !== -1) {
    trips[index] = { ...trips[index], ...updates };
    saveTrips(trips);
  }
}

export function deleteTrip(id: string): void {
  // Delete trip and all related data
  saveTrips(getTrips().filter(t => t.id !== id));
  saveEvents(getEvents().filter(e => e.tripId !== id));
  saveBudgetItems(getBudgetItems().filter(b => b.tripId !== id));
  savePackingItems(getPackingItems().filter(p => p.tripId !== id));
  saveJournalEntries(getJournalEntries().filter(j => j.tripId !== id));
}

// ============================================
// ITINERARY EVENTS
// ============================================

export function getEvents(): ItineraryEvent[] {
  if (!isBrowser()) return [];
  return safeJsonParse(localStorage.getItem(STORAGE_KEYS.EVENTS), []);
}

export function saveEvents(events: ItineraryEvent[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
}

export function getTripEvents(tripId: string): ItineraryEvent[] {
  return getEvents().filter(e => e.tripId === tripId);
}

export function addEvent(event: ItineraryEvent): void {
  const events = getEvents();
  events.push(event);
  saveEvents(events);
}

export function updateEvent(id: string, updates: Partial<ItineraryEvent>): void {
  const events = getEvents();
  const index = events.findIndex(e => e.id === id);
  if (index !== -1) {
    events[index] = { ...events[index], ...updates };
    saveEvents(events);
  }
}

export function deleteEvent(id: string): void {
  saveEvents(getEvents().filter(e => e.id !== id));
}

// ============================================
// BUDGET ITEMS
// ============================================

export function getBudgetItems(): BudgetItem[] {
  if (!isBrowser()) return [];
  return safeJsonParse(localStorage.getItem(STORAGE_KEYS.BUDGET), []);
}

export function saveBudgetItems(items: BudgetItem[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.BUDGET, JSON.stringify(items));
}

export function getTripBudget(tripId: string): BudgetItem[] {
  return getBudgetItems().filter(b => b.tripId === tripId);
}

export function updateBudgetItem(tripId: string, category: string, updates: Partial<BudgetItem>): void {
  const items = getBudgetItems();
  const index = items.findIndex(b => b.tripId === tripId && b.category === category);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates };
  } else {
    // Create if doesn't exist
    items.push({
      tripId,
      category: category as BudgetItem["category"],
      budgeted: 0,
      actual: 0,
      ...updates,
    });
  }
  saveBudgetItems(items);
}

// ============================================
// PACKING ITEMS
// ============================================

export function getPackingItems(): PackingItem[] {
  if (!isBrowser()) return [];
  return safeJsonParse(localStorage.getItem(STORAGE_KEYS.PACKING), []);
}

export function savePackingItems(items: PackingItem[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.PACKING, JSON.stringify(items));
}

export function getTripPacking(tripId: string): PackingItem[] {
  return getPackingItems().filter(p => p.tripId === tripId);
}

export function addPackingItem(item: PackingItem): void {
  const items = getPackingItems();
  items.push(item);
  savePackingItems(items);
}

export function updatePackingItem(id: string, updates: Partial<PackingItem>): void {
  const items = getPackingItems();
  const index = items.findIndex(p => p.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates };
    savePackingItems(items);
  }
}

export function deletePackingItem(id: string): void {
  savePackingItems(getPackingItems().filter(p => p.id !== id));
}

// ============================================
// JOURNAL ENTRIES
// ============================================

export function getJournalEntries(): JournalEntry[] {
  if (!isBrowser()) return [];
  return safeJsonParse(localStorage.getItem(STORAGE_KEYS.JOURNAL), []);
}

export function saveJournalEntries(entries: JournalEntry[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
}

export function getTripJournal(tripId: string): JournalEntry[] {
  return getJournalEntries().filter(j => j.tripId === tripId);
}

export function addJournalEntry(entry: JournalEntry): void {
  const entries = getJournalEntries();
  entries.push(entry);
  saveJournalEntries(entries);
}

export function updateJournalEntry(id: string, updates: Partial<JournalEntry>): void {
  const entries = getJournalEntries();
  const index = entries.findIndex(j => j.id === id);
  if (index !== -1) {
    entries[index] = { ...entries[index], ...updates };
    saveJournalEntries(entries);
  }
}

export function deleteJournalEntry(id: string): void {
  saveJournalEntries(getJournalEntries().filter(j => j.id !== id));
}

// ============================================
// EXPORT ALL AS TravelStorage NAMESPACE
// ============================================

export const TravelStorage = {
  // Trips
  getTrips,
  saveTrips,
  getTrip,
  addTrip,
  updateTrip,
  deleteTrip,
  // Events
  getEvents,
  saveEvents,
  getTripEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  // Budget
  getBudgetItems,
  saveBudgetItems,
  getTripBudget,
  updateBudgetItem,
  // Packing
  getPackingItems,
  savePackingItems,
  getTripPacking,
  addPackingItem,
  updatePackingItem,
  deletePackingItem,
  // Journal
  getJournalEntries,
  saveJournalEntries,
  getTripJournal,
  addJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
};
