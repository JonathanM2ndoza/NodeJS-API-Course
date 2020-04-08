const http = require('http');

const server = http.createServer((req, res) => {
    res.end("Hello from server NodeJS Update");
});
server.listen(3000);