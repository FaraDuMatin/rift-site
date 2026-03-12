interface ProgressBarProps {
  value: number;
  max: number;
  showLabel?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export default function ProgressBar({ 
  value, 
  max, 
  showLabel = false,
  size = "md",
  className = "" 
}: ProgressBarProps) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const isOverBudget = value > max;
  const overPercentage = max > 0 ? ((value - max) / max) * 100 : 0;

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div 
          className={`h-full rounded-full transition-all duration-300 ${
            isOverBudget ? "bg-red-500" : "bg-blue-main"
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      {showLabel && (
        <div className="flex justify-between mt-1">
          <span className={`text-xs ${isOverBudget ? "text-red-500 font-medium" : "text-gray-500"}`}>
            {value.toLocaleString("fr-FR")}
          </span>
          <span className="text-xs text-gray-400">
            / {max.toLocaleString("fr-FR")}
          </span>
        </div>
      )}
      
      {isOverBudget && showLabel && (
        <span className="text-[10px] text-red-500">
          +{overPercentage.toFixed(0)}% dépassé
        </span>
      )}
    </div>
  );
}
