const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 5174);
const buildDir = path.join(__dirname, '..', 'build');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const requestPath = req.url === '/' ? '/index.html' : req.url;
  const target = path.normalize(path.join(buildDir, requestPath));

  if (!target.startsWith(buildDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(target, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    const ext = path.extname(target);
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain; charset=utf-8' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`dummy-app-2 frontend running on http://localhost:${PORT}`);
});