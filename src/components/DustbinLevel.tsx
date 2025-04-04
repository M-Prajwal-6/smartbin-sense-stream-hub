
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getBinStatus, getBinStatusColor } from '@/services/websocketService';

interface DustbinLevelProps {
  fillPercentage: number;
}

const DustbinLevel: React.FC<DustbinLevelProps> = ({ fillPercentage }) => {
  const binStatus = getBinStatus(fillPercentage);
  const statusColor = getBinStatusColor(binStatus);
  
  // Display text based on bin status
  const getStatusText = () => {
    switch (binStatus) {
      case 'empty':
        return 'Empty';
      case 'low':
        return 'Nearly Empty';
      case 'medium':
        return 'Half Full';
      case 'high':
        return 'Nearly Full';
      case 'full':
        return 'Full - Needs Emptying';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Bin Fill Level</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Fill Level</span>
          <span className="font-bold">{Math.round(fillPercentage)}%</span>
        </div>
        
        <Progress value={fillPercentage} className="h-3" 
            style={{
              background: 'linear-gradient(to right, #2DD4BF 0%, #FBBF24 50%, #EF4444 100%)'
            }}
        />
        
        <div className="relative h-80 mt-8 mb-4">
          {/* Bin Container */}
          <div className="absolute inset-x-0 bottom-0 w-full h-full border-2 border-gray-300 rounded-lg overflow-hidden">
            {/* Fill Level Animation */}
            <div
              className={`absolute bottom-0 w-full ${statusColor} transition-all duration-500 ease-in-out`}
              style={{ 
                height: `${fillPercentage}%`,
                background: binStatus === 'full' || binStatus === 'high'
                  ? 'linear-gradient(180deg, #EF4444 0%, #E11D48 100%)'
                  : binStatus === 'medium'
                    ? 'linear-gradient(180deg, #FBBF24 0%, #F59E0B 100%)'
                    : 'linear-gradient(180deg, #2DD4BF 0%, #14B8A6 100%)'
              }}
            >
              {/* Animated wave effect */}
              <div className="absolute -top-4 left-0 w-full h-8">
                <div className="relative w-[200%] h-full animate-wave"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,0 C150,120 350,0 500,120 C650,0 850,120 1000,0 C1150,120 1350,0 1500,120 L1500,0 L0,0 Z\' opacity=\'0.3\'%3E%3C/path%3E%3C/svg%3E")',
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: '50% 100%',
                    backgroundPosition: '0 0',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 text-center">
          <span className={`text-lg font-bold ${
            binStatus === 'full' || binStatus === 'high'
              ? 'text-red-500'
              : binStatus === 'medium'
                ? 'text-amber-500'
                : 'text-emerald-500'
          }`}>
            {getStatusText()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DustbinLevel;
