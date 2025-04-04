
/**
 * Mock WebSocket Service
 * 
 * This file simulates a WebSocket connection for development and testing.
 * Replace this with actual WebSocket connection to your backend when ready.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Define the shape of the sensor data
export interface SensorData {
  temperature: number | null;
  humidity: number | null;
  ultrasonicDistance: number | null;
  timestamp?: number;
}

// Define the store state
interface MockWebSocketState {
  isConnected: boolean;
  lastMessage: SensorData | null;
  connectionStatus: string;
  simulationActive: boolean;
  serverAddress: string;
  serverPort: string;
  
  // Actions
  startSimulation: () => void;
  stopSimulation: () => void;
  connect: (address?: string, port?: string) => void;
  disconnect: () => void;
}

let simulationInterval: NodeJS.Timeout | null = null;

// Create the store
export const useMockWebSocketStore = create<MockWebSocketState>()(
  devtools(
    (set, get) => ({
      isConnected: false,
      lastMessage: null,
      connectionStatus: 'Disconnected',
      simulationActive: false,
      serverAddress: '192.168.1.104',
      serverPort: '3000',
      
      startSimulation: () => {
        if (simulationInterval) {
          clearInterval(simulationInterval);
        }
        
        set({ simulationActive: true, isConnected: true, connectionStatus: 'Connected (Simulation)' });
        
        simulationInterval = setInterval(() => {
          const newData: SensorData = {
            temperature: 20 + Math.random() * 10,
            humidity: 40 + Math.random() * 20,
            ultrasonicDistance: 10 + Math.random() * 90,
            timestamp: Date.now()
          };
          
          set({ lastMessage: newData });
        }, 3000);
      },
      
      stopSimulation: () => {
        if (simulationInterval) {
          clearInterval(simulationInterval);
          simulationInterval = null;
        }
        
        set({ 
          simulationActive: false,
          isConnected: false,
          connectionStatus: 'Disconnected'
        });
      },
      
      connect: (address, port) => {
        const serverAddress = address || get().serverAddress;
        const serverPort = port || get().serverPort;
        
        set({ 
          connectionStatus: 'Connecting...',
          serverAddress,
          serverPort
        });
        
        // Simulate connection attempt
        setTimeout(() => {
          const success = Math.random() > 0.3; // 70% chance of success
          
          if (success) {
            set({ 
              isConnected: true,
              connectionStatus: `Connected to ${serverAddress}:${serverPort}`
            });
            
            // Start sending mock data if connection is successful
            get().startSimulation();
          } else {
            set({ 
              isConnected: false,
              connectionStatus: `Connection failed to ${serverAddress}:${serverPort}`
            });
          }
        }, 1500);
      },
      
      disconnect: () => {
        get().stopSimulation();
        set({ 
          isConnected: false,
          connectionStatus: 'Disconnected'
        });
      }
    }),
    { name: 'mock-websocket-store' }
  )
);

// Initialize the connection when the module is imported
const initMockWebSocket = () => {
  // Auto-start simulation in development environment
  if (process.env.NODE_ENV === 'development') {
    setTimeout(() => {
      useMockWebSocketStore.getState().startSimulation();
    }, 1000);
  }
};

initMockWebSocket();
