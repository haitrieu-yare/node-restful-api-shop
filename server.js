// Server Setup

// importing package (http package)
const http = require('http');
// importing app.js file
const app = require('./app');
// choosing port (default in environment variable or 3000)
const port = process.env.PORT || 3000;
// create a server based on http package
const server = http.createServer(app);
// tell server to listen on this port
server.listen(port);