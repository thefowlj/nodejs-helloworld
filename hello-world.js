//hello-world.js
//basic hello world node.js server
const http = require('http');
const port = 3001;

http.createServer((req,res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(port, "127.0.0.1");
console.log(`Server running at http://127.0.0.1:${port}`);
