
const express = require('express');
const mqtt = require('mqtt');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');

// MQTT Broker and Topics
const mqttBroker = 'mqtt://mqtt.platinumrobotics.com';
const mqttUser = 'mqtt_user';  // Replace with your MQTT username
const mqttPassword = '8655167646'; // Replace with your MQTT password
const mqttTopicTemp = 'dustbin/sensor/temp'; // Topic for temperature data
const mqttTopicHum = 'dustbin/sensor/hum'; // Topic for humidity data
const mqttTopicUltrasonic = 'dustbin/sensor/ultrasonic'; // Topic for ultrasonic sensor data

// Variables to store sensor data
let temperature = null;
let humidity = null;
let ultrasonicDistance = null; // Variable to store ultrasonic sensor data

// Create MQTT client
const client = mqtt.connect(mqttBroker, {
    username: mqttUser,
    password: mqttPassword
});

// MQTT Event Handlers
client.on('connect', () => {
    console.log('Connected to MQTT Broker');
    // Subscribe to sensor topics
    client.subscribe([mqttTopicTemp, mqttTopicHum, mqttTopicUltrasonic], (err) => {
        if (err) {
            console.error('Failed to subscribe to topics:', err);
        } else {
            console.log(`Subscribed to topics: ${mqttTopicTemp}, ${mqttTopicHum}, ${mqttTopicUltrasonic}`);
        }
    });
});

client.on('error', (err) => {
    console.log('MQTT Connection Error:', err);
});

client.on('message', (topic, message) => {
    const payload = message.toString();
    console.log(`Received message: Topic = ${topic}, Payload = ${payload}`);

    // Update sensor data based on topic
    if (topic === mqttTopicTemp) {
        temperature = parseFloat(payload);
        console.log(`Temperature updated: ${temperature} °C`);
    } else if (topic === mqttTopicHum) {
        humidity = parseFloat(payload);
        console.log(`Humidity updated: ${humidity} %`);
    } else if (topic === mqttTopicUltrasonic) {
        ultrasonicDistance = parseFloat(payload);
        console.log(`Ultrasonic distance updated: ${ultrasonicDistance} cm`);
    }

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
});

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
        ultrasonicDistance: ultrasonicDistance, // Add ultrasonic sensor data to response
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

// Handle WebSocket upgrade (to allow WebSocket connections to be handled by Express)
app.server = app.listen(port, '0.0.0.0', () => {
    console.log(`Node.js server running on http://0.0.0.0:${port}`);
    console.log(`Access the server from other devices via: http://192.168.1.104:${port}`);
});

app.server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
