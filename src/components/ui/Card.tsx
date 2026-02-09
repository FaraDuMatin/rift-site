import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface CardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  button?: {
    text: string;
    href: string;
  };
}

export default function Card({ icon: Icon, title, description, features, button }: CardProps) {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
    >
      {/* Icon */}
      <motion.div 
        className="w-16 h-16 bg-blue-light/30 rounded-2xl flex items-center justify-center mb-6"
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-8 h-8 text-blue-dark" strokeWidth={2} />
      </motion.div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-base leading-relaxed mb-6">
        {description}
      </p>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-light rounded-full mt-2 shrink-0" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Optional Button */}
      {button && (
        <motion.a
          href={button.href}
          className="block w-full text-center px-6 py-3 bg-blue-light text-white font-medium rounded-xl transition-colors hover:bg-blue-main"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {button.text}
        </motion.a>
      )}
    </motion.div>
  );
}