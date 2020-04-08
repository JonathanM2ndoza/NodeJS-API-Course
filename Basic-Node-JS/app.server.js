const http = require('http');

const server = http.createServer((req, res) => {
    res.end("Hello from server NodeJS");
});
server.listen(3000);