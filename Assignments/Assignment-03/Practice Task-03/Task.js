const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toISOString();   

  const log = `[${time}] Method: ${method} | URL: ${url}\n`;

  const filePath = path.join(__dirname, 'logs', 'server.log');

  fs.appendFile(filePath, log, (err) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Gadbad hai');
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Chal gaya bhai');
  });
});

server.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
