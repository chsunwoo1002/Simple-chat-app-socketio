const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

let cache = {};

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  // send message to current socket
  socket.emit('message', 'Welcome!');

  socket.on('sendMessage', ({ message, to }) => {
    let socketId = cache[to];
    // send message to specific user
    io.to(socketId).emit('message', message);
  });

  // register email(user)
  socket.on('sendEmail', (msg) => {
    cache[msg] = socket.id;
    // ACK
    socket.emit('message', 'ok!');
  });

  socket.on('disconnet', () => {
    // broadcase to every connected socket
    io.emit('message', 'A user has left!');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
