const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const params = url.searchParams;

  if (params.has('hello')) {
    const name = params.get('hello');
    if (name) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Hello, ${name}!`);
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Введите имя');
    }
  } else if (params.has('users')) {
    const filePath = path.join(__dirname, 'data', 'users.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end('');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  } else if (params.size === 0) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!');
  } else {
    res.writeHead(500);
    res.end();
  }
});
server.listen(3003, '127.0.0.1', () => {
  console.log('Сервер запущен: http://127.0.0.1:3003/');
});
