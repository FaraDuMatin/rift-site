"use client";

import { motion } from "motion/react";
import { User, Mail, Calendar, Award } from "lucide-react";

interface ProfileCardProps {
  firstName: string | null;
  lastName: string | null;
  email: string;
  imageUrl?: string;
  createdAt: number;
}

export default function ProfileCard({
  firstName,
  lastName,
  email,
  imageUrl,
  createdAt,
}: ProfileCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-lg font-bold text-gray-900 mb-5">Mon profil</h2>

      <div className="flex flex-col items-center text-center mb-5">
        {imageUrl ? (
          <motion.img
            src={imageUrl}
            alt="Photo de profil"
            className="w-20 h-20 rounded-2xl object-cover border-3 border-blue-main/20 mb-3"
            whileHover={{ scale: 1.05 }}
          />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-blue-main/10 flex items-center justify-center mb-3">
            <User className="w-8 h-8 text-blue-main" />
          </div>
        )}
        <p className="font-bold text-gray-900 text-lg">
          {firstName} {lastName}
        </p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-lg bg-blue-main/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4 text-blue-main" />
          </div>
          <div className="flex-1">
            <p className="text-gray-500 text-xs">Membre depuis</p>
            <p className="text-gray-900 font-medium">
              {new Date(createdAt).toLocaleDateString("fr-FR", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex-1">
            <p className="text-gray-500 text-xs">Statut</p>
            <p className="text-gray-900 font-medium">Nouveau membre</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <Mail className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex-1">
            <p className="text-gray-500 text-xs">Email vérifié</p>
            <p className="text-gray-900 font-medium">Oui ✓</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
