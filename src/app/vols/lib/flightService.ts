import flightData from '../data/kiwi_dummy.json';

export interface Flight {
  id: string;
  flyFrom: string;
  flyTo: string;
  cityFrom: string;
  cityTo: string;
  price: number;
  local_departure: string;
  local_arrival: string;
  airlines: string[];
  route: { airline: string; flight_no: number; flyFrom: string; flyTo: string }[];
  booking_token: string;
}

export interface SearchParams {
  from: string;
  to: string;
  departureDate: string;
}

const cityToCode: Record<string, string> = {
  'Djibouti': 'JIB',
  'Addis-Abeba': 'ADD',
  'Nairobi': 'NBO',
  'Dar es Salaam': 'DAR',
  'Kigali': 'KGL',
  'Kampala': 'EBB',
  'Mogadishu': 'MGQ',
  'Asmara': 'ASM',
  'Paris': 'CDG',
  'Dubai': 'DXB',
  'Istanbul': 'IST'
};

export function searchFlights(params: SearchParams): Flight[] {
  const { from, to, departureDate } = params;
  
  const fromCode = cityToCode[from] || from;
  const toCode = cityToCode[to] || to;
  
  const flights = flightData.data as Flight[];
  
  return flights.filter(flight => {
    const matchesOrigin = flight.flyFrom === fromCode || flight.cityFrom === from;
    const matchesDestination = flight.flyTo === toCode || flight.cityTo === to;
    
    // Check if departure date matches (same day)
    const flightDate = new Date(flight.local_departure).toISOString().split('T')[0];
    const matchesDate = flightDate === departureDate;
    
    return matchesOrigin && matchesDestination && matchesDate;
  }).sort((a, b) => a.price - b.price);
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
}

export function calculateDuration(departure: string, arrival: string): string {
  const diff = new Date(arrival).getTime() - new Date(departure).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}
