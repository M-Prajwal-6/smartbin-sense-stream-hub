
import { create } from 'zustand';

export interface SensorData {
  temperature: number | null;
  humidity: number | null;
  ultrasonicDistance: number | null;
}

// Calculate fill level based on ultrasonic distance
// We assume the bin is 30cm deep, so 30cm = empty, 0cm = full
export const calculateFillPercentage = (distance: number | null): number => {
  if (distance === null) return 0;
  
  // Assuming bin depth is 30 cm
  const binDepth = 30;
  
  // Ensure distance is not greater than bin depth
  const clampedDistance = Math.min(Math.max(0, distance), binDepth);
  
  // Calculate fill percentage (inverse of distance percentage)
  // When distance is 30cm (empty), fill is 0%
  // When distance is 0cm (full), fill is 100%
  const fillPercentage = 100 - (clampedDistance / binDepth * 100);
  
  return Math.round(fillPercentage);
};

export const getBinStatus = (fillPercentage: number): 'empty' | 'low' | 'medium' | 'high' | 'full' => {
  if (fillPercentage < 20) return 'empty';
  if (fillPercentage < 40) return 'low';
  if (fillPercentage < 70) return 'medium';
  if (fillPercentage < 90) return 'high';
  return 'full';
};

// Color based on bin status
export const getBinStatusColor = (status: ReturnType<typeof getBinStatus>): string => {
  switch (status) {
    case 'empty':
    case 'low':
      return 'bg-dustbin-empty';
    case 'medium':
      return 'bg-dustbin-medium';
    case 'high':
    case 'full':
      return 'bg-dustbin-full';
    default:
      return 'bg-gray-300';
  }
};

// Zustand store for sensor data
interface SensorStore extends SensorData {
  historyData: {
    temperature: Array<{ timestamp: number; value: number }>;
    humidity: Array<{ timestamp: number; value: number }>;
    ultrasonicDistance: Array<{ timestamp: number; value: number }>;
  };
  addHistoryData: (data: SensorData) => void;
  updateData: (data: SensorData) => void;
  fillPercentage: number;
  binStatus: ReturnType<typeof getBinStatus>;
  lastConnectionTime: Date | null;
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
}

// Initialize WebSocket and create store
const initWebSocket = (setStore: (fn: (state: SensorStore) => SensorStore) => void) => {
  // Connect to your backend server
  const serverUrl = 'ws://192.168.1.104:3000'; // Replace with your server IP if different
  
  let ws: WebSocket | null = null;
  let reconnectTimeout: number | null = null;

  const connectWebSocket = () => {
    // Clear any existing reconnect timeout
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }

    // Update connection status to connecting
    setStore((state) => ({
      ...state,
      connectionStatus: 'connecting'
    }));

    // Create new WebSocket connection
    ws = new WebSocket(serverUrl);

    ws.onopen = () => {
      console.log('WebSocket connection established to real server');
      
      // Update connection status and time
      setStore((state) => ({
        ...state,
        connectionStatus: 'connected',
        lastConnectionTime: new Date()
      }));
    };

    ws.onmessage = (event) => {
      try {
        const data: SensorData = JSON.parse(event.data);
        console.log('Received sensor data:', data);
        
        // Update store with new data
        setStore((state) => {
          const fillPercentage = calculateFillPercentage(data.ultrasonicDistance);
          const binStatus = getBinStatus(fillPercentage);
          
          return {
            ...state,
            ...data,
            fillPercentage,
            binStatus,
            lastConnectionTime: new Date()
          };
        });
        
        // Add to history data
        setStore((state) => {
          const now = Date.now();
          
          // Only add data points if they exist
          const updatedHistory = {
            temperature: [...state.historyData.temperature],
            humidity: [...state.historyData.humidity],
            ultrasonicDistance: [...state.historyData.ultrasonicDistance],
          };
          
          if (data.temperature !== null) {
            updatedHistory.temperature.push({ timestamp: now, value: data.temperature });
            // Keep only the last 50 data points
            if (updatedHistory.temperature.length > 50) {
              updatedHistory.temperature.shift();
            }
          }
          
          if (data.humidity !== null) {
            updatedHistory.humidity.push({ timestamp: now, value: data.humidity });
            // Keep only the last 50 data points
            if (updatedHistory.humidity.length > 50) {
              updatedHistory.humidity.shift();
            }
          }
          
          if (data.ultrasonicDistance !== null) {
            updatedHistory.ultrasonicDistance.push({ timestamp: now, value: data.ultrasonicDistance });
            // Keep only the last 50 data points
            if (updatedHistory.ultrasonicDistance.length > 50) {
              updatedHistory.ultrasonicDistance.shift();
            }
          }
          
          return {
            ...state,
            historyData: updatedHistory,
          };
        });
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed. Reconnecting...');
      
      // Update connection status
      setStore((state) => ({
        ...state,
        connectionStatus: 'disconnected'
      }));
      
      // Try to reconnect after 5 seconds
      reconnectTimeout = window.setTimeout(connectWebSocket, 5000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      
      // Update connection status
      setStore((state) => ({
        ...state,
        connectionStatus: 'disconnected'
      }));
      
      // Close the connection (will trigger onclose and reconnect)
      ws?.close();
    };
  };

  // Initial connection
  connectWebSocket();

  // Cleanup function to be called when component unmounts
  return () => {
    if (ws) {
      ws.close();
    }
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
    }
  };
};

// Create store with initial values
export const useSensorStore = create<SensorStore>((set) => {
  // Initialize WebSocket connection
  const cleanup = initWebSocket(set);

  // Return store with initial state and methods
  return {
    temperature: null,
    humidity: null,
    ultrasonicDistance: null,
    fillPercentage: 0,
    binStatus: 'empty',
    lastConnectionTime: null,
    connectionStatus: 'connecting',
    
    historyData: {
      temperature: [],
      humidity: [],
      ultrasonicDistance: [],
    },
    
    updateData: (data) => set((state) => {
      const fillPercentage = calculateFillPercentage(data.ultrasonicDistance);
      const binStatus = getBinStatus(fillPercentage);
      
      return {
        ...state,
        ...data,
        fillPercentage,
        binStatus,
      };
    }),
    
    addHistoryData: (data) => set((state) => {
      const now = Date.now();
      
      return {
        ...state,
        historyData: {
          temperature: data.temperature !== null 
            ? [...state.historyData.temperature, { timestamp: now, value: data.temperature }] 
            : state.historyData.temperature,
          humidity: data.humidity !== null 
            ? [...state.historyData.humidity, { timestamp: now, value: data.humidity }] 
            : state.historyData.humidity,
          ultrasonicDistance: data.ultrasonicDistance !== null 
            ? [...state.historyData.ultrasonicDistance, { timestamp: now, value: data.ultrasonicDistance }] 
            : state.historyData.ultrasonicDistance,
        },
      };
    }),
  };
});

// For development and demonstration purposes, we can simulate data
export const simulateSensorData = () => {
  const generateRandomValue = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  setInterval(() => {
    const temperature = generateRandomValue(18, 32);
    const humidity = generateRandomValue(30, 90);
    const ultrasonicDistance = generateRandomValue(0, 30);

    useSensorStore.getState().updateData({
      temperature,
      humidity,
      ultrasonicDistance,
    });
    
    useSensorStore.getState().addHistoryData({
      temperature,
      humidity,
      ultrasonicDistance,
    });
  }, 3000);
};

// Comment out simulation function as we're using real data now
// simulateSensorData();
