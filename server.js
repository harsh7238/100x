const express = require('express');
const http = require('http');

const socketIo = require('socket.io');

const app = express();
app.use(express.static(__dirname)); 
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT =  3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
