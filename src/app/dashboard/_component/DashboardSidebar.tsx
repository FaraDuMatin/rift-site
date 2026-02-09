"use client";

import Link from "next/link";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import {
  LayoutDashboard,
  LogOut,
  Plane,
  FileText,
  Hotel,
  Compass,
} from "lucide-react";
import { motion } from "motion/react";

export type TabId = "dashboard" | "flights" | "visa" | "hotels" | "excursions";

const navItems: { icon: typeof LayoutDashboard; label: string; id: TabId }[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    id: "dashboard",
  },
  {
    icon: Plane,
    label: "Mes Vols",
    id: "flights",
  },
  {
    icon: FileText,
    label: "Mes Visas",
    id: "visa",
  },
  {
    icon: Hotel,
    label: "Mes Hôtels",
    id: "hotels",
  },
  {
    icon: Compass,
    label: "Mes Excursions",
    id: "excursions",
  },
];

interface DashboardSidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function DashboardSidebar({
  activeTab,
  onTabChange,
}: DashboardSidebarProps) {
  const { signOut } = useClerk();

  return (
    <motion.aside
      className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-gray-200 flex flex-col"
      initial={{ x: -264 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo_rift.png"
            alt="The Rift Logo"
            width={50}
            height={50}
            priority
          />
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">
              The Rift
            </h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Travel Agency
            </p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 mb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          Mon Espace
        </p>
        <ul className="space-y-1 mb-6">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.label}>
                <motion.button
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-blue-main text-white shadow-md shadow-blue-main/25"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-100 p-3">
        <motion.button
          onClick={() => signOut({ redirectUrl: "/" })}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-5 h-5" />
          <span>Se déconnecter</span>
        </motion.button>
      </div>
    </motion.aside>
  );
}
