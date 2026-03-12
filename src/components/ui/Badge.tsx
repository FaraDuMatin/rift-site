import type { TripStatus } from "@/types/travel";
import { STATUS_CONFIG } from "@/types/travel";

interface BadgeProps {
  status: TripStatus;
  size?: "sm" | "md";
}

export default function Badge({ status, size = "md" }: BadgeProps) {
  const config = STATUS_CONFIG[status];
  
  const colorClasses: Record<string, string> = {
    amber: "bg-amber-100 text-amber-600",
    blue: "bg-blue-main/10 text-blue-main",
    emerald: "bg-emerald-100 text-emerald-600",
    gray: "bg-gray-100 text-gray-600",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span 
      className={`
        inline-flex items-center rounded-full font-medium
        ${colorClasses[config.color]}
        ${sizeClasses[size]}
      `}
    >
      {config.label}
    </span>
  );
}
