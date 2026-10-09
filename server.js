// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Serve static files (Next.js will be served separately in production)
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  // Join a room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`socket ${socket.id} joined room ${roomId}`);
  });

  // Broadcast play event to the room
  socket.on('play', ({ roomId, currentTime, timestamp }) => {
    // Forward to other participants
    socket.to(roomId).emit('play', { currentTime, timestamp });
  });

  // Broadcast pause event
  socket.on('pause', ({ roomId, currentTime, timestamp }) => {
    socket.to(roomId).emit('pause', { currentTime, timestamp });
  });

  // Broadcast seek event
  socket.on('seek', ({ roomId, currentTime, timestamp }) => {
    socket.to(roomId).emit('seek', { currentTime, timestamp });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
