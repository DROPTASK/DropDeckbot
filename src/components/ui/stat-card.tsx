
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon, className, trend }: StatCardProps) {
  return (
    <div className={cn("stat-card flex flex-col", className)}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-semibold">{value}</p>
        {trend && (
          <span 
            className={cn(
              "text-xs font-medium flex items-center",
              trend.isPositive ? "text-green-500" : "text-red-500"
            )}
          >
            {trend.isPositive ? "+" : "-"}{trend.value}%
          </span>
        )}
      </div>
    </div>
  );
}
