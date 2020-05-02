import debug from 'debug';
import User from './models/User.js';
import Room from './models/Room.js';
import { events } from './constants/index.js';

const logerror = debug('tetris:error');
const loginfo = debug('tetris:info');
const rooms = {};


const createUsersList = (room) => {
  const { users } = room;
  const usersList = [];

  loginfo('%O', users);
  loginfo('%O', rooms);
  for (const client in users) {
    const user = users[client];
    loginfo('%O', user);
    usersList.push({ name: user.name, id: user.id, isAdmin: user.isAdmin });
  }
  return usersList;
};

const joinRoom = (socket, room, user, cb) => {
  loginfo('joinRoom(socket:%o, room:%o)', user.name, room.name);

  // Join socket.io room
  loginfo('joining socketio room...');
  socket.join(room.name, () => {
    loginfo('user:%o joined room %o !', user.name, room.name);

    // Save roomId in socket
    loginfo('user.room = room.name (%o)', room.name);
    user.room = room.name;

    // Add socket in db room
    room.users.push(user);

    if (room.users.length === 1) {
      loginfo('user %o is admin', user.name);
      user.isAdmin = true;
    }
    cb();
  });
  return true;
};

const leaveRooms = (socket, user) => {
  const roomsToDelete = [];

  for (const id in rooms) {
    const room = rooms[id];

    if (room.users.includes(user)) {
      socket.leave(id);
      room.users = room.users.filter((item) => item !== user);
    }
    if (room.users.length === 0) {
      roomsToDelete.push(room.id);
    }
  }

  for (const id in roomsToDelete) {
    delete rooms[id];
  }
};

export default function handleSocket(socket, io) {
  loginfo('New client connected with id %o', socket.id);

  const user = User.init(socket);

  socket.on(events.CREATE_ROOM, (roomName, username, cb) => {
    loginfo('Recieved createRoom from %o', username);
    user.name = username;
    const room = Room.init(roomName);
    rooms[room.name] = room;
    user.room = room.name;
    joinRoom(socket, room, user, cb);
  });

  socket.on(events.JOIN_ROOM, (roomName, username, cb) => {
    loginfo('Recieved joinRoom %o from %o', roomName, username);
    const room = rooms[roomName];

    if (room !== null) {
      user.name = username;
      joinRoom(socket, room, user, cb);
    } else {
      logerror('did not find room with name: %o', roomName);
      cb();
    }
  });

  socket.on(events.IS_ROOM_AVAILABLE, (roomName, cb) => {
    const room = rooms[roomName];

    if (room === undefined) {
      cb({ status: true, needCreate: true });
    } else if (room.launched) {
      cb({ status: false, error: 'An epic battle is already happening here !' });
    } else if (room.users.length === 2) {
      cb({ status: false, error: 'This room is already full...' });
    } else {
      cb({ status: true, needCreate: false });
    }
  });

  socket.on(events.CHECK_ROOM_USER, (roomName, username, cb) => {
    const room = rooms[roomName];
    let status = false;
    let data = null;

    if (room === undefined) {
      data = 'room not in db';
    } else {
      for (const client in room.users) {
        if (room.users[client].name === username) {
          status = true;
        }
      }
      if (!status) {
        data = 'user not in room';
      }
    }
    if (status) {
      loginfo('user %o is ready', user.name);
      io.in(room.name).emit('userReady', createUsersList(room));
    }
    cb({ status, data });
  });

  socket.on(events.START_GAME, () => {
    const room = rooms[user.room];
    // const r = initGame(room);
    // loginfo('user %o launched %o game in room %o', user.name, room.name);
    io.in(room.name).emit('start', room.pieces);
    // room.launched = true;
  });

  socket.on('newPiece', () => {
    user.me.x = 4;
    user.me.y = 0;
    user.pieceIndex += 1;
  });

  socket.on(events.DISCONNECT, () => {
    loginfo('Client disconnected');
    leaveRooms(socket, user);
  });

  socket.on('move', (where) => {
    const room = rooms[user.room];
    switch (where) {
      case 'up':
        user.me.y -= 1;
        break;
      case 'down':
        user.me.y += 1;
        break;
      case 'left':
        user.me.x = user.me.x <= 0
          ? user.me.x
          : user.me.x - 1;
        break;
      case 'right':
        user.me.x = user.me.x + room.pieces[user.pieceIndex][user.pieceState].width < 10
          ? user.me.x + 1
          : user.me.x;
        break;
      default:
        break;
    }
    io.in(room.name).emit('userMoved', user.me);
  });
}
