
// WebSocket Configuration
export interface WebSocketConfig {
  serverUrl: string;
  useSecureWs: boolean;
  reconnectInterval: number;
  maxReconnectAttempts: number;
}

// Default WebSocket configuration
const defaultConfig: WebSocketConfig = {
  serverUrl: '192.168.1.104:3000', // Replace with your actual server IP and port
  useSecureWs: window.location.protocol === 'https:', // Use secure WebSocket if page is loaded over HTTPS
  reconnectInterval: 5000, // Reconnect every 5 seconds
  maxReconnectAttempts: 10 // Maximum number of reconnect attempts
};

// Export the configuration
export const websocketConfig = defaultConfig;
