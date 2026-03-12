// Travel Planner Type Definitions

export type TripStatus = "planning" | "booked" | "ongoing" | "completed";

export type EventType = 
  | "flight" 
  | "hotel" 
  | "activity" 
  | "restaurant" 
  | "transport" 
  | "other";

export type BudgetCategory = 
  | "flights" 
  | "accommodation" 
  | "activities" 
  | "food" 
  | "shopping" 
  | "transport" 
  | "other";

export type Mood = "amazing" | "happy" | "neutral" | "tired" | "disappointed";

export type PackingCategory = 
  | "clothes" 
  | "footwear" 
  | "toiletries" 
  | "tech" 
  | "documents" 
  | "other";

export interface Trip {
  id: string;
  destination: string;
  country: string;
  countryFlag: string;
  startDate: string;
  endDate: string;
  status: TripStatus;
  totalBudget: number;
  currency: string;
  createdAt: string;
}

export interface ItineraryEvent {
  id: string;
  tripId: string;
  day: number;
  title: string;
  type: EventType;
  startTime?: string;
  endTime?: string;
  location?: string;
  cost: number;
  notes?: string;
  completed: boolean;
}

export interface BudgetItem {
  tripId: string;
  category: BudgetCategory;
  budgeted: number;
  actual: number;
}

export interface PackingItem {
  id: string;
  tripId: string;
  category: PackingCategory;
  item: string;
  packed: boolean;
}

export interface JournalEntry {
  id: string;
  tripId: string;
  date: string;
  title?: string;
  content: string;
  mood?: Mood;
  rating?: number;
  location?: string;
}

// Utility types
export interface Countdown {
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOverdue: boolean;
}

export interface TripStats {
  total: number;
  planning: number;
  booked: number;
  ongoing: number;
  completed: number;
}

// Default budget categories with labels
export const BUDGET_CATEGORIES: { value: BudgetCategory; label: string; icon: string }[] = [
  { value: "flights", label: "Vols", icon: "plane" },
  { value: "accommodation", label: "Hébergement", icon: "bed" },
  { value: "activities", label: "Activités", icon: "ticket" },
  { value: "food", label: "Nourriture", icon: "utensils" },
  { value: "shopping", label: "Shopping", icon: "shopping-bag" },
  { value: "transport", label: "Transport", icon: "car" },
  { value: "other", label: "Autre", icon: "ellipsis" },
];

// Default packing categories with labels
export const PACKING_CATEGORIES: { value: PackingCategory; label: string }[] = [
  { value: "clothes", label: "Vêtements" },
  { value: "footwear", label: "Chaussures" },
  { value: "toiletries", label: "Toilettes" },
  { value: "tech", label: "Tech / Gadgets" },
  { value: "documents", label: "Documents" },
  { value: "other", label: "Autre" },
];

// Mood options with emojis
export const MOOD_OPTIONS: { value: Mood; emoji: string; label: string }[] = [
  { value: "amazing", emoji: "🤩", label: "Incroyable" },
  { value: "happy", emoji: "😊", label: "Heureux" },
  { value: "neutral", emoji: "😐", label: "Neutre" },
  { value: "tired", emoji: "😴", label: "Fatigué" },
  { value: "disappointed", emoji: "😞", label: "Déçu" },
];

// Mood emoji lookup
export const MOOD_EMOJI: Record<Mood, string> = {
  amazing: "🤩",
  happy: "😊",
  neutral: "😐",
  tired: "😴",
  disappointed: "😞",
};

// Mood label lookup
export const MOOD_LABELS: Record<Mood, string> = {
  amazing: "Incroyable",
  happy: "Heureux",
  neutral: "Neutre",
  tired: "Fatigué",
  disappointed: "Déçu",
};

// Status labels and colors
export const STATUS_CONFIG: Record<TripStatus, { label: string; color: string }> = {
  planning: { label: "Planification", color: "amber" },
  booked: { label: "Réservé", color: "blue" },
  ongoing: { label: "En cours", color: "emerald" },
  completed: { label: "Terminé", color: "gray" },
};

// Event type config
export const EVENT_TYPE_CONFIG: Record<EventType, { label: string; icon: string }> = {
  flight: { label: "Vol", icon: "plane" },
  hotel: { label: "Hôtel", icon: "bed" },
  activity: { label: "Activité", icon: "ticket" },
  restaurant: { label: "Restaurant", icon: "utensils" },
  transport: { label: "Transport", icon: "car" },
  other: { label: "Autre", icon: "ellipsis" },
};
