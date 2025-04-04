
# Smart Dustbin Monitoring System Backend

This backend server connects to an MQTT broker to receive sensor data and provides both REST API and WebSocket interfaces for the frontend to consume the data.

## Prerequisites

Before running the backend, make sure you have the following installed:

- Node.js (version 14.x or later)
- npm (Node Package Manager)

## Installation

1. Navigate to the backend directory:
```bash
cd src/backend
```

2. Install the required dependencies:
```bash
npm install express mqtt body-parser cors ws
```

## Running the Server

### Production Server (with MQTT)

To start the server with MQTT connection, run:

```bash
node server.js
```

### Development Server (with Simulated Data)

For development and testing purposes without requiring an MQTT connection, run:

```bash
node local-test-server.js
```

This will generate random sensor data every 3 seconds.

The server will start on port 3000 by default and will be accessible via:
- `http://localhost:3000` (from the same machine)
- `http://YOUR_IP_ADDRESS:3000` (from other devices on the same network)

## API Endpoints

- `GET /api/sensors` - Returns the current sensor readings (temperature, humidity, and ultrasonic distance)

## WebSocket Connection

The server also provides a WebSocket interface at:
- `ws://localhost:3000` (from the same machine)
- `ws://YOUR_IP_ADDRESS:3000` (from other devices on the same network)

When a WebSocket connection is established, the server will:
1. Send the current sensor readings immediately
2. Send updates whenever new sensor data is received (from MQTT or simulation)

## MQTT Configuration

The server connects to an MQTT broker to receive sensor data. The following topics are subscribed to:
- `dustbin/sensor/temp` - Temperature readings
- `dustbin/sensor/hum` - Humidity readings
- `dustbin/sensor/ultrasonic` - Ultrasonic distance readings (for fill level calculation)

You can modify the MQTT configuration in `server.js` if needed.

## Troubleshooting

If you encounter issues connecting to the MQTT broker, check:
1. Your network connection
2. Your MQTT credentials in `server.js`
3. That the MQTT broker is running and accessible

If the WebSocket connections are not working, ensure that:
1. Your firewall allows connections on port 3000
2. You're using the correct WebSocket URL in your frontend code
