
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend, 
  trendValue,
  className 
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && trendValue && (
          <div className="flex items-center mt-1">
            <span
              className={cn(
                "text-xs font-medium",
                trend === "up" ? "text-green-500" : "",
                trend === "down" ? "text-red-500" : "",
                trend === "neutral" ? "text-muted-foreground" : ""
              )}
            >
              {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
