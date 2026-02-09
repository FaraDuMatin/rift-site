"use client";

import { Search, Bell } from "lucide-react";
import { motion } from "motion/react";

interface DashboardHeaderProps {
  firstName: string | null;
  imageUrl?: string;
}

export default function DashboardHeader({
  firstName,
  imageUrl,
}: DashboardHeaderProps) {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";

  return (
    <motion.header
      className="flex items-center justify-between mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {greeting}, {firstName || "Voyageur"} 
        </h1>
        {/* <p className="text-gray-500 mt-1">
          Bienvenue sur votre espace voyage. Que souhaitez-vous faire
          aujourd&apos;hui ?
        </p> */}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        
        {/* <motion.button
          className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors"
          whileHover={{scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search className="w-5 h-5" />
        </motion.button> */}

        {/* Notifications */}

        {/* <motion.button
          className="relative w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">
            2
          </span>
        </motion.button> */}

        {/* Avatar */}
        {imageUrl && (
          <motion.img
            src={imageUrl}
            alt="Profil"
            className="w-10 h-10 rounded-xl object-cover border-2 border-blue-main/20"
            whileHover={{ scale: 1.05 }}
          />
        )}
      </div>
    </motion.header>
  );
}
