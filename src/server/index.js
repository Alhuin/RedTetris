import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import debug from 'debug';

import routes from './routes.js';
import handleSocket from './socketio.js';

const port = process.env.PORT || 4001;
const app = express();
app.use(routes);

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => handleSocket(socket, io));

server.listen(port, () => debug(`Listening on port ${port}`));
