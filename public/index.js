const socket = io('http://localhost:4000');

socket.on('connect', () => {
  console.log('conectado al servidor');
});

socket.on('disconnect', () => {
  console.log('Perdimos conección con el servidor');
});

let state;

socket.emit('createBoard', 10, (resp) => {
  console.log('respuesta server:', resp);
  state = resp;
});

socket.emit(
  'performAction',
  {
    coords: { x: 8, y: 2 },
    board: [
      [1, -1, 1, 0, 0, 0, 1, 1, 1, 0],
      [1, 1, 1, 0, 0, 0, 1, -1, 1, 0],
      [0, 1, 1, 1, 0, 0, 2, 2, 2, 0],
      [1, 2, -1, 1, 0, 0, 1, -1, 1, 0],
      [-1, 3, 1, 1, 1, 1, 2, 1, 1, 0],
      [-1, 2, 0, 0, 2, -1, 2, 0, 0, 0],
      [1, 1, 0, 0, 2, -1, 2, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    flags: [
      [1, -1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, -1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, -1, 1, 1, 1, 1, -1, 1, 1],
      [-1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [-1, 1, 1, 1, 1, -1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, -1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
  (resp) => {
    console.log('respuesta server:', resp);
  }
);

socket.on('enviarMensaje', (mensaje) => {
  console.log('Servidor:', mensaje);
});
