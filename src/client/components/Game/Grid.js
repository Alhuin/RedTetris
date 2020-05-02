import React, { useRef } from 'react';


const Tetris = () => {
  const ref = useRef();
  return (
    <canvas ref={ref} style={{ width: '100px', height: '100px' }} />
  );
};

export default Tetris;
