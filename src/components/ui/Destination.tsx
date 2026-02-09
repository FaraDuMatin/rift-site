import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface DestinationProps {
  name: string;
  description: string;
  imageUrl: string;
  highlights: string[];
  href?: string;
}

export default function Destination({ name, description, imageUrl, highlights, href = '#' }: DestinationProps) {
  return (
    <motion.a 
      href={href}
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 block"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      {/* Image */}
      <div className="aspect-4/3 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          width={800}
          height={600}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
        {/* Title with Icon */}
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="w-5 h-5 text-(--blue-main)" strokeWidth={2} />
          <h3 className="text-2xl font-bold">{name}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-200 mb-4">
          {description}
        </p>

        {/* Highlights Tags */}
        <div className="flex flex-wrap gap-2">
          {highlights.map((highlight, index) => (
            <span 
              key={index}
              className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}