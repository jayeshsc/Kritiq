const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/submit') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const formData = JSON.parse(body);
      // Do something with the form data
      console.log(formData);
      // Send response
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Form submitted successfully!\n');
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found\n');
  }
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});
