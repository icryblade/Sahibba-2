const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Serve static files from workspace root
app.use(express.static(__dirname));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', game: 'Sahibba v4', timestamp: Date.now() });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Sahibba v4 Server running at http://localhost:${PORT}`);
});
