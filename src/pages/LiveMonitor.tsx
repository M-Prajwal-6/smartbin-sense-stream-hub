
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSensorStore } from "@/services/websocketService";
import SensorChart from "@/components/SensorChart";

// Dummy data for initial rendering
const generateDummyData = (count: number, baseValue: number, variance: number) => {
  return Array.from({ length: count }, (_, i) => ({
    timestamp: Date.now() - (count - i) * 1000,
    value: baseValue + (Math.random() * variance * 2) - variance
  }));
};

const LiveMonitor = () => {
  const { 
    connectionStatus,
    historyData,
    temperature,
    humidity,
    ultrasonicDistance
  } = useSensorStore();

  const isConnected = connectionStatus === 'connected' || connectionStatus === 'simulation';
  const lastMessage = temperature !== null || humidity !== null || ultrasonicDistance !== null ? 
    { temperature, humidity, ultrasonicDistance } : null;

  const [temperatureData, setTemperatureData] = useState(generateDummyData(10, 25, 2));
  const [humidityData, setHumidityData] = useState(generateDummyData(10, 50, 5));
  const [fillLevelData, setFillLevelData] = useState(generateDummyData(10, 30, 10));

  useEffect(() => {
    if (lastMessage) {
      const now = Date.now();
      
      if (lastMessage.temperature !== undefined) {
        setTemperatureData(prev => [
          ...prev.slice(-19),
          { timestamp: now, value: lastMessage.temperature }
        ]);
      }
      
      if (lastMessage.humidity !== undefined) {
        setHumidityData(prev => [
          ...prev.slice(-19),
          { timestamp: now, value: lastMessage.humidity }
        ]);
      }
      
      if (lastMessage.ultrasonicDistance !== undefined) {
        // Convert ultrasonic distance to fill level (example conversion)
        const maxDistance = 100; // Maximum distance sensor can measure in cm
        const fillLevel = Math.max(0, Math.min(100, (1 - lastMessage.ultrasonicDistance / maxDistance) * 100));
        
        setFillLevelData(prev => [
          ...prev.slice(-19),
          { timestamp: now, value: fillLevel }
        ]);
      }
    }
  }, [lastMessage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Live Monitor</h1>
            <Badge 
              variant={isConnected ? "default" : "outline"} 
              className={isConnected ? "bg-green-500 hover:bg-green-600" : "text-red-500"}
            >
              {connectionStatus}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Temperature</CardTitle>
                <CardDescription>
                  {temperature !== null ? `${temperature.toFixed(1)}°C` : "No data"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SensorChart 
                  title="Live Temperature"
                  data={temperatureData}
                  color="#ef4444"
                  unit="°C"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Humidity</CardTitle>
                <CardDescription>
                  {humidity !== null ? `${humidity.toFixed(1)}%` : "No data"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SensorChart 
                  title="Live Humidity"
                  data={humidityData}
                  color="#3b82f6"
                  unit="%"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Fill Level</CardTitle>
                <CardDescription>
                  {ultrasonicDistance !== null ? `${(100 - ultrasonicDistance).toFixed(1)}%` : "No data"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SensorChart 
                  title="Live Fill Level"
                  data={fillLevelData}
                  color="#10b981"
                  unit="%"
                />
              </CardContent>
            </Card>
          </div>
          
          {!isConnected && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Connection Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-600">
                  Not connected to backend. Please visit the Connect Device page to establish a connection
                  or check your backend configuration.
                </p>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Raw Sensor Data</CardTitle>
              <CardDescription>Latest data received from backend</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 p-4 rounded-md overflow-auto text-sm">
                {lastMessage ? JSON.stringify(lastMessage, null, 2) : "No data received yet"}
              </pre>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            Smart Dustbin Monitoring System © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LiveMonitor;
