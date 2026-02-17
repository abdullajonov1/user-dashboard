import { LucideIcon } from "lucide-react";
import type { ThemeType } from "../App";

interface IndicatorCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  theme: ThemeType;
  color: "blue" | "green" | "yellow" | "purple" | "teal";
}

export function IndicatorCard({
  icon: Icon,
  title,
  subtitle,
  theme,
  color,
}: IndicatorCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    green: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    yellow:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
    purple:
      "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
    teal: "bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300",
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md flex items-center gap-4">
      <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
        <Icon size={28} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-sm text-gray-900">{title}</h4>
        <p className="text-xs mt-1 text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}
