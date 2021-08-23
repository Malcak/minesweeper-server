const socket = io();

socket.on('connect', () => {
  console.log('conectado al servidor');
});

socket.on('disconnect', () => {
  console.log('Perdimos conección con el servidor');
});

socket.emit('createBoard', 10, (resp) => {
  console.log('respuesta server:', resp);
});

socket.on('enviarMensaje', (mensaje) => {
  console.log('Servidor:', mensaje);
});
