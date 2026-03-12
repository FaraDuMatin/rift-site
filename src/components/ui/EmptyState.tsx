"use client";

import { motion } from "motion/react";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ 
  icon, 
  title, 
  description, 
  action 
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <motion.div
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 rounded-2xl bg-blue-main/10 flex items-center justify-center mb-4"
      >
        <div className="text-blue-main">
          {icon}
        </div>
      </motion.div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-gray-500 max-w-xs mb-6">
        {description}
      </p>
      
      {action && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={action.onClick}
          className="px-6 py-3 bg-blue-main text-white rounded-xl text-sm font-semibold hover:bg-blue-dark transition-colors"
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
}
