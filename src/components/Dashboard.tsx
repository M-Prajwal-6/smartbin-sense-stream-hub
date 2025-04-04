
import { useEffect } from "react";
import { useSensorStore, simulateSensorData } from "@/services/websocketService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SensorCard from "@/components/SensorCard";
import DustbinLevel from "@/components/DustbinLevel";
import SensorChart from "@/components/SensorChart";
import { Thermometer, Droplets, Ruler } from "lucide-react";

const Dashboard = () => {
  const { 
    temperature, 
    humidity, 
    ultrasonicDistance, 
    fillPercentage,
    historyData 
  } = useSensorStore();

  // Use simulation data for development until the real server is connected
  useEffect(() => {
    simulateSensorData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Smart Dustbin Monitoring Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sensor Cards */}
        <SensorCard 
          title="Temperature"
          value={temperature !== null ? temperature : null}
          unit="°C"
          icon={Thermometer}
          iconColor="text-red-500"
        />
        
        <SensorCard 
          title="Humidity"
          value={humidity !== null ? humidity : null}
          unit="%"
          icon={Droplets}
          iconColor="text-blue-500"
        />
        
        <SensorCard 
          title="Distance"
          value={ultrasonicDistance !== null ? ultrasonicDistance : null}
          unit="cm"
          icon={Ruler}
          iconColor="text-amber-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Dustbin Visualization */}
        <DustbinLevel fillPercentage={fillPercentage} />
        
        {/* Status Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Smart Dustbin Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Bin ID</div>
                <div className="font-semibold">SMART-BIN-01</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Location</div>
                <div className="font-semibold">Building A, Floor 2</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Last Emptied</div>
                <div className="font-semibold">Today, 9:30 AM</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Status</div>
                <div className={`font-semibold ${
                  fillPercentage > 80 
                    ? 'text-red-500' 
                    : fillPercentage > 50 
                      ? 'text-amber-500' 
                      : 'text-emerald-500'
                }`}>
                  {fillPercentage > 80 
                    ? 'Needs Attention' 
                    : fillPercentage > 50 
                      ? 'Filling Up' 
                      : 'Normal'}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Active Sensors</div>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Temperature
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Humidity
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Ultrasonic
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Last Connection</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse-gentle"></div>
                Connected - Receiving data
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Temperature Chart */}
        <SensorChart 
          title="Temperature History" 
          data={historyData.temperature}
          color="#ef4444"
          unit="°C"
        />
        
        {/* Humidity Chart */}
        <SensorChart 
          title="Humidity History" 
          data={historyData.humidity}
          color="#3b82f6"
          unit="%"
        />
      </div>
    </div>
  );
};

export default Dashboard;
