import express from 'express';
import http from 'http';
import {Server as SocketServer} from 'socket.io';

const PORT = 3000;
const app  = express();
const server = http.createServer(app)
const io = new SocketServer(server, {
  cors: {
    //! it allow me access from any origin, but I can to manage it from vite js config
    origin: '*',
  }
})

// console.log(io);

io.on('connection', (socket) => {
  console.log('-- a user connected --');
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })


  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    socket.broadcast.emit('message', msg)
  })
})

app.get('/', (req, res) => {
  res.send('API is running..., I am using ES modules');
}
);

server.listen(PORT, console.log(`Server running in on port ${PORT}`));