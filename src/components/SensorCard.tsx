
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SensorCardProps {
  title: string;
  value: number | string | null;
  icon: LucideIcon;
  unit: string;
  className?: string;
  iconColor?: string;
}

const SensorCard = ({ title, value, icon: Icon, unit, className = "", iconColor = "text-primary" }: SensorCardProps) => {
  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {value !== null ? value : "--"}
          <span className="text-lg ml-1 font-normal text-muted-foreground">
            {value !== null ? unit : ""}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorCard;
