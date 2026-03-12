"use client";

import { motion } from "motion/react";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export default function Tabs({ tabs, activeTab, onChange, className = "" }: TabsProps) {
  return (
    <div className={`flex gap-1 p-1 bg-gray-100 rounded-xl ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              relative flex-1 flex items-center justify-center gap-2 px-4 py-2.5 
              text-sm font-medium rounded-lg transition-colors
              ${isActive 
                ? "text-gray-900" 
                : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-lg shadow-sm"
                transition={{ type: "spring", duration: 0.3 }}
              />
            )}
            
            <span className="relative flex items-center gap-2">
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
