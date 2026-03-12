// Travel Planner Utility Functions

import type { Trip, Countdown, TripStats, TripStatus } from "@/types/travel";

/**
 * Generate a unique ID (simple UUID v4 alternative)
 */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Calculate countdown to a date
 */
export function calculateCountdown(targetDate: string): Countdown {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isOverdue: true,
    };
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  return {
    months: months,
    weeks: weeks % 4,
    days: days % 7,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
    isOverdue: false,
  };
}

/**
 * Format a date range: "6 Nov → 13 Nov 2025"
 */
export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startDay = start.getDate();
  const endDay = end.getDate();
  
  const startMonth = start.toLocaleDateString("fr-FR", { month: "short" });
  const endMonth = end.toLocaleDateString("fr-FR", { month: "short" });
  
  const endYear = end.getFullYear();
  
  // Same month and year
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${startDay} - ${endDay} ${endMonth} ${endYear}`;
  }
  
  // Same year
  if (start.getFullYear() === end.getFullYear()) {
    return `${startDay} ${startMonth} → ${endDay} ${endMonth} ${endYear}`;
  }
  
  // Different years
  const startYear = start.getFullYear();
  return `${startDay} ${startMonth} ${startYear} → ${endDay} ${endMonth} ${endYear}`;
}

/**
 * Format a single date
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format date for input (YYYY-MM-DD)
 */
export function formatDateForInput(date: string): string {
  return new Date(date).toISOString().split("T")[0];
}

/**
 * Get trip duration in days
 */
export function getDuration(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Get the next upcoming trip (soonest start date in the future)
 */
export function getNextTrip(trips: Trip[]): Trip | null {
  const now = new Date();
  
  const upcomingTrips = trips
    .filter(t => new Date(t.startDate) > now && t.status !== "completed")
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
  return upcomingTrips[0] || null;
}

/**
 * Get ongoing trips (current date is between start and end)
 */
export function getOngoingTrips(trips: Trip[]): Trip[] {
  const now = new Date();
  
  return trips.filter(t => {
    const start = new Date(t.startDate);
    const end = new Date(t.endDate);
    return start <= now && end >= now;
  });
}

/**
 * Calculate trip statistics
 */
export function getTripStats(trips: Trip[]): TripStats {
  return {
    total: trips.length,
    planning: trips.filter(t => t.status === "planning").length,
    booked: trips.filter(t => t.status === "booked").length,
    ongoing: trips.filter(t => t.status === "ongoing").length,
    completed: trips.filter(t => t.status === "completed").length,
  };
}

/**
 * Get status-based styling classes
 */
export function getStatusClasses(status: TripStatus): { bg: string; text: string } {
  const config: Record<TripStatus, { bg: string; text: string }> = {
    planning: { bg: "bg-amber-100", text: "text-amber-600" },
    booked: { bg: "bg-blue-main/10", text: "text-blue-main" },
    ongoing: { bg: "bg-emerald-100", text: "text-emerald-600" },
    completed: { bg: "bg-gray-100", text: "text-gray-600" },
  };
  return config[status];
}

/**
 * Sort trips by date (newest first for completed, soonest first for others)
 */
export function sortTrips(trips: Trip[]): Trip[] {
  return [...trips].sort((a, b) => {
    // Ongoing trips first
    if (a.status === "ongoing" && b.status !== "ongoing") return -1;
    if (b.status === "ongoing" && a.status !== "ongoing") return 1;
    
    // Then by start date
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });
}

/**
 * Filter trips by status
 */
export function filterTripsByStatus(trips: Trip[], status: TripStatus | "all"): Trip[] {
  if (status === "all") return trips;
  return trips.filter(t => t.status === status);
}

/**
 * Common country flags mapping
 */
export const COUNTRY_FLAGS: Record<string, string> = {
  "Djibouti": "🇩🇯",
  "Éthiopie": "🇪🇹",
  "Kenya": "🇰🇪",
  "Tanzanie": "🇹🇿",
  "Rwanda": "🇷🇼",
  "Ouganda": "🇺🇬",
  "Somalie": "🇸🇴",
  "France": "🇫🇷",
  "États-Unis": "🇺🇸",
  "Espagne": "🇪🇸",
  "Italie": "🇮🇹",
  "Allemagne": "🇩🇪",
  "Royaume-Uni": "🇬🇧",
  "Japon": "🇯🇵",
  "Chine": "🇨🇳",
  "Brésil": "🇧🇷",
  "Maroc": "🇲🇦",
  "Égypte": "🇪🇬",
  "Australie": "🇦🇺",
  "Canada": "🇨🇦",
  "Mexique": "🇲🇽",
  "Thaïlande": "🇹🇭",
  "Grèce": "🇬🇷",
  "Portugal": "🇵🇹",
  "Pays-Bas": "🇳🇱",
  "Suisse": "🇨🇭",
  "Belgique": "🇧🇪",
  "Tunisie": "🇹🇳",
  "Sénégal": "🇸🇳",
  "Côte d'Ivoire": "🇨🇮",
  "Algérie": "🇩🇿",
  "Turquie": "🇹🇷",
  "Émirats arabes unis": "🇦🇪",
  "Inde": "🇮🇳",
  "Corée du Sud": "🇰🇷",
  "Indonésie": "🇮🇩",
  "Viêt Nam": "🇻🇳",
  "Argentine": "🇦🇷",
  "Colombie": "🇨🇴",
  "Pérou": "🇵🇪",
  "Afrique du Sud": "🇿🇦",
  "Nouvelle-Zélande": "🇳🇿",
  "Singapour": "🇸🇬",
  "Malaisie": "🇲🇾",
  "Philippines": "🇵🇭",
  "Pologne": "🇵🇱",
  "Autriche": "🇦🇹",
  "Irlande": "🇮🇪",
  "Norvège": "🇳🇴",
  "Suède": "🇸🇪",
  "Danemark": "🇩🇰",
  "Finlande": "🇫🇮",
  "Russie": "🇷🇺",
  "Croatie": "🇭🇷",
  "République tchèque": "🇨🇿",
  "Hongrie": "🇭🇺",
  "Roumanie": "🇷🇴",
};

/**
 * Get all countries as options
 */
export function getCountryOptions(): { value: string; label: string; flag: string }[] {
  return Object.entries(COUNTRY_FLAGS).map(([country, flag]) => ({
    value: country,
    label: country,
    flag,
  })).sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Currency options
 */
export const CURRENCY_OPTIONS = [
  { value: "EUR", label: "Euro (€)", symbol: "€" },
  { value: "USD", label: "Dollar US ($)", symbol: "$" },
  { value: "GBP", label: "Livre Sterling (£)", symbol: "£" },
  { value: "MAD", label: "Dirham marocain (DH)", symbol: "DH" },
  { value: "XOF", label: "Franc CFA (CFA)", symbol: "CFA" },
  { value: "CHF", label: "Franc suisse (CHF)", symbol: "CHF" },
  { value: "CAD", label: "Dollar canadien (CA$)", symbol: "CA$" },
  { value: "JPY", label: "Yen (¥)", symbol: "¥" },
];

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: string): string {
  return CURRENCY_OPTIONS.find(c => c.value === currency)?.symbol || currency;
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number, currency: string): string {
  const symbol = getCurrencySymbol(currency);
  return `${amount.toLocaleString("fr-FR")} ${symbol}`;
}
