
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');

// Variables to store sensor data
let temperature = 25 + (Math.random() * 5);
let humidity = 50 + (Math.random() * 15);
let ultrasonicDistance = 15 + (Math.random() * 10); // Variable to store ultrasonic sensor data

// Express App Setup
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to fetch sensor data
app.get('/api/sensors', (req, res) => {
    res.json({
        temperature: temperature,
        humidity: humidity,
        ultrasonicDistance: ultrasonicDistance,
    });
});

// Set up WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');
    
    // Send initial data to the new WebSocket client
    const initialData = {
        temperature: temperature,
        humidity: humidity,
        ultrasonicDistance: ultrasonicDistance
    };
    ws.send(JSON.stringify(initialData));

    // Handle WebSocket disconnections
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

// Generate random sensor data every 3 seconds
setInterval(() => {
    // Generate random fluctuations
    temperature = Math.max(10, Math.min(40, temperature + (Math.random() * 2 - 1)));
    humidity = Math.max(30, Math.min(90, humidity + (Math.random() * 5 - 2.5)));
    ultrasonicDistance = Math.max(0, Math.min(30, ultrasonicDistance + (Math.random() * 4 - 2)));
    
    console.log(`Generated new values: Temp=${temperature.toFixed(1)}°C, Humidity=${humidity.toFixed(1)}%, Distance=${ultrasonicDistance.toFixed(1)}cm`);
    
    // Broadcast data to all connected WebSocket clients
    if (wss.clients) {
        const data = {
            temperature: temperature,
            humidity: humidity,
            ultrasonicDistance: ultrasonicDistance
        };

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
}, 3000);

// Handle WebSocket upgrade
app.server = app.listen(port, '0.0.0.0', () => {
    console.log(`Local test server running on http://0.0.0.0:${port}`);
    console.log(`This is a simulation server that generates random sensor data`);
});

app.server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
