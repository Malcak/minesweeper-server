const path = require('path');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const createBoard = require('./actions/createBoard');
const performAction = require('./actions/performAction');

const app = express();
app.set('port', process.env.PORT || 4000);
app.use(express.static(path.join(__dirname, '../public')));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('createBoard', createBoard);
  socket.on('performAction', performAction);
});

server.listen(app.get('port'), () => {
  console.log(
    `🚀 Server is running at \x1b[1mhttp://localhost:${app.get(
      'port'
    )}\x1b[0m in \x1b[1m${app.get('env')}\x1b[0m mode`
  );
});
