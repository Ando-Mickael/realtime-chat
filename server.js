require("dotenv").config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST'],
    },
});

const PORT = process.env.PORT;

io.on('connection', (socket) => {
    console.log('+ USER: ' + socket.id);

    socket.on('chat message', (data) => {
        console.log('+ MESSAGE: ', data);
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('- USER: ' + socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/ \n`);
});