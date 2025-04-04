
/**
 * Smart Bin API Client
 * 
 * This is a placeholder API client that you can replace with your actual backend implementation.
 * Replace these mock functions with actual API calls to your backend server.
 */

// Types for API responses
export interface SensorData {
  temperature: number | null;
  humidity: number | null;
  ultrasonicDistance: number | null;
  timestamp: number;
}

export interface DeviceConfig {
  deviceId: string;
  location: string;
  reportingInterval: number;
  alertThreshold: number;
}

// Mock data for simulation
const generateMockSensorData = (): SensorData => ({
  temperature: 20 + Math.random() * 10,
  humidity: 40 + Math.random() * 20,
  ultrasonicDistance: 10 + Math.random() * 90,
  timestamp: Date.now()
});

// Mock API functions
export const fetchSensorData = async (): Promise<SensorData> => {
  // This is where you would make a real HTTP request to your server
  // For example: return fetch('http://your-server/api/sensors').then(res => res.json())
  
  // For now, return mock data after a small delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockSensorData());
    }, 500);
  });
};

export const fetchHistoricalData = async (
  sensorType: 'temperature' | 'humidity' | 'fillLevel',
  period: 'day' | 'week' | 'month'
): Promise<SensorData[]> => {
  // This would normally fetch historical data from your backend
  // For example: return fetch(`http://your-server/api/history/${sensorType}/${period}`).then(res => res.json())
  
  // For now, generate mock historical data
  const dataPoints = period === 'day' ? 24 : period === 'week' ? 7 : 30;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: SensorData[] = [];
      const now = Date.now();
      
      for (let i = 0; i < dataPoints; i++) {
        let value: number;
        
        switch (sensorType) {
          case 'temperature':
            value = 20 + Math.random() * 10;
            break;
          case 'humidity':
            value = 40 + Math.random() * 20;
            break;
          case 'fillLevel':
            value = 10 + (i / dataPoints) * 80 + (Math.random() * 10 - 5);
            break;
        }
        
        const timestamp = now - (dataPoints - i) * (period === 'day' ? 3600000 : 
                                                   period === 'week' ? 86400000 : 86400000);
        
        mockData.push({
          temperature: sensorType === 'temperature' ? value : null,
          humidity: sensorType === 'humidity' ? value : null,
          ultrasonicDistance: sensorType === 'fillLevel' ? 100 - value : null,
          timestamp
        });
      }
      
      resolve(mockData);
    }, 800);
  });
};

export const saveDeviceConfig = async (config: DeviceConfig): Promise<boolean> => {
  // This would normally send configuration to your backend
  // For example: return fetch('http://your-server/api/config', { method: 'POST', body: JSON.stringify(config) })
  //                .then(res => res.ok)
  
  // For now, simulate a successful save after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Device config saved (mock):', config);
      resolve(true);
    }, 1000);
  });
};

export const connectToDevice = async (serverAddress: string, port: string): Promise<boolean> => {
  // This would normally establish a connection to your backend
  // For example: return fetch(`http://${serverAddress}:${port}/api/connect`)
  //                .then(res => res.ok)
  //                .catch(() => false)
  
  // For now, simulate a connection attempt
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% chance of success
      console.log(`Connection ${success ? 'successful' : 'failed'} to ${serverAddress}:${port} (mock)`);
      resolve(success);
    }, 1500);
  });
};

// You can add more API functions here as needed
