// express app
const express = require("express");
const app = express();

// init http server
const http = require("http");
const server = http.createServer(app);

// init WebSocket server instance
const WebSocket = require("ws");
const wss = new WebSocket.Server({
  server
});

const PORT = process.env.PORT || 8999

wss.on('connection', (ws) => {
  let count = 0
  wss.clients.forEach(client => {
    setInterval(() => {
      const data = {
        id: count,
        firstName: `first-${count}`,
        lastName: `name-${count}`
      }
      console.log(`---- sending message to WebSocket - ${count}`)
      client.send(JSON.stringify(data));
      count++
    }, 2000)
  });

  // send an immediate feedback to the incoming connection
  ws.send('Hi there, I am a WebSocket server');
});


server.listen(PORT, () => {
  console.log(`WebSocket Server started on port ${server.address().port} :)`);
});
