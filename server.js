const app = require('./app');
const http = require('http');

const port = parseInt(process.env.PORT, 10);
const defaultPort = 8888;
const normalizedPort = port || defaultPort;

http.createServer(app).listen(normalizedPort);
