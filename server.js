const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files
app.use(express.static(__dirname));

// Game scores and words storage
const scores = {};

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Submit score and words
    socket.on('submit-score', (data) => {
        const { name, score, words } = data;
        
        if (!scores[name]) {
            scores[name] = {
                scores: [],
                words: []
            };
        }
        
        // Store the score
        scores[name].scores = scores[name].scores || [];
        scores[name].scores.push(score);
        
        // Store the words - make sure we're storing the actual array, not just a reference
        if (words && Array.isArray(words)) {
            scores[name].words = [...words]; // Make a copy of the array
        }
        
        // Log for debugging
        console.log(`Player ${name} submitted score: ${score} with ${words ? words.length : 0} words`);
        console.log(`Words stored for ${name}:`, scores[name].words);
        
        // Emit updated scores to all clients
        io.emit('update-scores', scores);
    });
    
    // On connect, send current scores to the new client
    socket.emit('update-scores', scores);
    
    // Disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 