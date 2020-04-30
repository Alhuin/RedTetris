import uuid from 'uuid';
import debug from 'debug';

import {
  CREATE_ROOM, JOIN_ROOM, START_GAME, DISCONNECT, IS_ROOM_AVAILABLE,
  CHECK_ROOM_USER,
} from './constants/events.js';


const logerror = debug('tetris:error');
const loginfo = debug('tetris:info');
const rooms = {};

const createRoom = (roomName) => {
  loginfo('createRoom(roomName:%o)', roomName);
  const room = {
    id: uuid.v4().toString(),
    name: roomName,
    users: [],
    launched: false,
  };
  rooms[room.name] = room;
  return rooms[room.name];
};

const createUsersList = (room) => {
  const { users } = room;
  const usersList = [];

  loginfo('%O', users);
  loginfo('%O', rooms);
  for (const client in users) {
    const user = users[client];
    loginfo('%O', user);
    usersList.push({ name: user.name, id: user.id });
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

  const user = {
    id: uuid.v4(),
    name: '',
    socket,
    room: '',
    isAdmin: false,
  };

  socket.on(CREATE_ROOM, (roomName, username, cb) => {
    loginfo('Recieved createRoom from %o', username);
    user.name = username;
    const room = createRoom(roomName);
    joinRoom(socket, room, user, cb);
  });

  socket.on(JOIN_ROOM, (roomName, username, cb) => {
    loginfo('Recieved joinRoom %o from %o', roomName, username);
    const room = rooms[roomName];

    loginfo('%O', room);
    if (room !== null) {
      user.name = username;
      joinRoom(socket, room, user, cb);
    } else {
      logerror('did not find room with name: %o', roomName);
      cb();
    }
  });

  socket.on(IS_ROOM_AVAILABLE, (roomName, cb) => {
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

  socket.on(CHECK_ROOM_USER, (roomName, username, cb) => {
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

  socket.on(START_GAME, () => {
    const room = rooms[user.room];
    // const r = initGame(room);
    // loginfo('user %o launched %o game in room %o', user.name, room.name);
    io.in(room.name).emit('startGame', room);
    // room.launched = true;
  });

  socket.on(DISCONNECT, () => {
    loginfo('Client disconnected');
    leaveRooms(socket, user);
  });
}
