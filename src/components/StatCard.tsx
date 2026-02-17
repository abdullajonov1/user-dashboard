import { TrendingUp, TrendingDown } from 'lucide-react';
import type { ThemeType } from '../App';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  theme: ThemeType;
  bgColor: string;
  textColor: string;
}

export function StatCard({ title, value, change, theme, bgColor, textColor }: StatCardProps) {
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 shadow-md border-l-4 ${bgColor}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${textColor}`}>
            {value}
          </p>
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            change >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
    </div>
  );
}
