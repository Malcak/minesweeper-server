const numCPUs = require('os').cpus().length;
const cluster = require('cluster');
const path = require('path');
const cors = require('cors');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const { setupMaster, setupWorker } = require('@socket.io/sticky');
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');

const createBoard = require('./actions/createBoard');
const performAction = require('./actions/performAction');
const setFlag = require('./actions/setFlag');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  const app = express();
  app.set('port', process.env.PORT || 4000);
  app.use(cors)

  const server = http.createServer(app);

  setupMaster(server, {
    loadBalancingMethod: 'least-connection',
  });

  setupPrimary();

  cluster.setupPrimary({
    serialization: 'advanced',
  });

  server.listen(app.get('port'), () => {
    console.log(
      `🚀 Server is running at \x1b[1mhttp://localhost:${app.get(
        'port'
      )}\x1b[0m in \x1b[1m${app.get('env')}\x1b[0m mode`
    );
  });

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const app = express();
  app.use(cors)

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origins: ['*'],
    },
  });

  io.adapter(createAdapter());

  setupWorker(io);

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('createBoard', createBoard);
    socket.on('performAction', performAction);
    socket.on('setFlag', setFlag);
  });
}
