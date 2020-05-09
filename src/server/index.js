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

console.log(process.env.NODE_ENV);
const server = (process.env.NODE_ENV !== undefined)
  ? https.createServer(
    {
      key: fs.readFileSync('/Users/julien/ssl/localhost.key'),
      cert: fs.readFileSync('/Users/julien/ssl/localhost.crt'),
    },
    app,
  ) : new Server(app);

const io = socketio(server);
// io.origins('*:*');
io.on('connection', (socket) => handleSocket(socket, io));

server.listen(port, () => debug(`Listening on port ${port}`));
