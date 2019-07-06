const http = require('http');
const app = require('./app');

const port = 7431;

const server = http.createServer(app);

server.listen(port);