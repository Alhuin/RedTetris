import React, { useEffect, useState } from 'react';
import './testGrid.css';
import { useDispatch, useSelector } from 'react-redux';

import { selectSocket } from '../../redux/selectors';

const w = 10;
const h = 16;

const keyLeft = 37;
const keyUp = 38;
const keyRight = 39;
const keyDown = 40;

const handleKeys = (socket) => (event) => {
  switch (event.keyCode) {
    case keyUp:
      event.preventDefault();
      socket.emit('move', 'up');
      break;
    case keyDown:
      event.preventDefault();
      socket.emit('move', 'down');
      break;
    case keyLeft:
      event.preventDefault();
      socket.emit('move', 'left');
      break;
    case keyRight:
      event.preventDefault();
      socket.emit('move', 'right');
      break;
    default:
      break;
  }
};

function decimalToBinary(number) {
  let i = 0;
  let binary = '';
  let temp = number;

  while (i < w) {
    if (temp % 2 === 0) {
      binary = `0${binary}`;
    } else {
      binary = `1${binary}`;
    }
    temp = Math.floor(temp / 2);
    i++;
  }
  return binary;
}

const buildLine = (binStr, index) => {
  const cells = [];

  for (const i in binStr) {
    const color = binStr[i] === '1' ? 'red' : 'white';
    cells.push(<div className="sub_block" key={`l${index}c${i}`} style={{ backgroundColor: color }} />);
  }
  return <div className="line" key={`l${index.toString()}`}>{cells}</div>;
};

const buildGrid = (grid) => {
  const lines = [];

  grid.forEach((line, index) => {
    const binStr = decimalToBinary(line);
    const li = buildLine(binStr, index);
    lines.push(li);
  });
  return lines;
};

const checkPutPiece = (piece, me, grid) => {
  const toPut = [];
  let err = false;

  piece.pattern.forEach((line, index) => {
    let newMask = line.mask;

    for (let i = 0; i < (w - me.x - line.length); i++) {
      newMask *= 2;
    }
    if ((grid[me.y + index] & newMask)) {
      err = true;
    } else {
      toPut.push({
        index: me.y + index,
        mask: newMask,
      });
    }
  });
  return err ? [] : toPut;
};

const putPiece = (piece, me, grid) => {
  const toPut = checkPutPiece(piece, me, grid);

  console.log('toPut ', toPut);
  toPut.forEach((line) => {
    grid[line.index] |= line.mask;
  });
  return grid;
};


function TestGrid() {
  const socket = useSelector(selectSocket);
  const [currentPiece, setCurrentPiece] = useState(0);
  const [me, setMe] = useState({ x: 4, y: 0 });
  const pieces = useSelector((state) => state.pieces);
  const cleanBoard = useSelector((state) => state.cleanBoard.slice(0));
  const piece = pieces[currentPiece][0];
  const grid = putPiece(piece, me, new Uint16Array(cleanBoard));
  const dispatch = useDispatch();

  if (me.y + piece.height === h) {
    setTimeout(() => {
      dispatch({ type: 'SET_CLEAN_BOARD', payload: grid.buffer });
      socket.emit('newPiece');
    }, 1000);
  }

  useEffect(() => {
    socket.on('userMoved', (coord) => {
      setMe(coord);
    });
    const interval = setInterval(() => {
      socket.emit('move', 'down');
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.addEventListener(
      'keydown',
      handleKeys(socket),
      false,
    );
    return () => {
      window.removeEventListener(
        'keydown',
        handleKeys(socket),
        false,
      );
    };
  }, []);

  return (
    <div className="flex-container">
      {buildGrid(grid)}
    </div>
  );
}

export default TestGrid;
