const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const messages = [];

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html');
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.get('/api/messages/user/:username', (req, res) => {
  const username = req.params.username.toLowerCase();
  const userMessages = messages.filter(msg => msg.username.toLowerCase() === username);
  res.json(userMessages);
});

app.get('/api/messages/room/:room', (req, res) => {
  const room = req.params.room.toLowerCase();
  const roomMessages = messages.filter(msg => msg.room.toLowerCase() === room);
  res.json(roomMessages);
});

app.get('/api/messages/contains/:word', (req, res) => {
  const word = req.params.word.toLowerCase();
  const filteredMessages = messages.filter(msg => msg.message.toLowerCase().includes(word));
  res.json(filteredMessages);
});

io.on('connection', socket => {
  socket.on('join', ({ username, room }) => {
    socket.join(room);
    io.to(room).emit('message', { username, message: `${username} has joined the room.` });
  });

  socket.on('message', ({ username, message, room }) => {
    const newMessage = { username, message, room, timestamp: new Date() };
    messages.push(newMessage);
    io.to(room).emit('message', newMessage);
  });

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
