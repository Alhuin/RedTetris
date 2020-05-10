import express from 'express';
import * as https from 'https';
import { Server } from 'http';
import * as fs from 'fs';
import socketio from 'socket.io';
import debug from 'debug';

import routes from './routes.js';
import handleSocket from './socketio.js';

const port = process.env.PORT || 4001;
const app = express();

app.use(routes);

// Create https server if node_env is production, else http
const server = (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'production')
  ? https.createServer(
    {
      key: fs.readFileSync('/Users/julien/ssl/localhost.key'),
      cert: fs.readFileSync('/Users/julien/ssl/localhost.crt'),
    },
    app,
  ) : new Server(app);

const io = socketio(server);
io.on('connection', (socket) => handleSocket(socket, io));

server.listen(port, () => debug(`Listening on port ${port}`));
