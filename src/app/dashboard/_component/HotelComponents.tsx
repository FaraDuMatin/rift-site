"use client";

import { motion } from "motion/react";
import { Hotel, Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

// TODO: Replace with actual user hotel bookings from database
const userHotels: {
  id: string;
  name: string;
  location: string;
  checkIn: string;
  checkOut: string;
  status: "confirmed" | "pending";
}[] = [];

export default function HotelComponent() {
  const hasBookings = userHotels.length > 0;

  return (
    <motion.div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-blue-light/30 flex items-center justify-center">
          <Hotel className="w-6 h-6 text-blue-dark" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Mes Réservations d&apos;Hôtels</h2>
          <p className="text-sm text-gray-500">
            {hasBookings
              ? `${userHotels.length} réservation(s)`
              : "Aucune réservation"}
          </p>
        </div>
      </div>

      <div className="flex-1">
        {hasBookings ? (
          <div className="space-y-3">
            {userHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-light/30 flex items-center justify-center">
                  <Hotel className="w-5 h-5 text-blue-dark" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{hotel.name}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {hotel.checkIn} - {hotel.checkOut}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    hotel.status === "confirmed"
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {hotel.status === "confirmed" ? "Confirmé" : "En attente"}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <motion.div
              className="w-20 h-20 rounded-full bg-blue-light/30 flex items-center justify-center mb-4"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Hotel className="w-9 h-9 text-blue-dark" />
            </motion.div>
            <p className="text-lg font-medium text-gray-900 mb-1">
              Aucune réservation d&apos;hôtel
            </p>
            <p className="text-sm text-gray-400 max-w-xs">
              Trouvez l&apos;hébergement idéal pour votre prochain voyage en
              Afrique de l&apos;Est.
            </p>
          </div>
        )}
      </div>

      <Link href="/hotels" className="mt-6">
        <motion.button
          className="w-full py-3.5 bg-blue-light text-white rounded-xl text-sm font-semibold hover:bg-blue-main transition-colors flex items-center justify-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Réserver un hôtel</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </Link>
    </motion.div>
  );
}
