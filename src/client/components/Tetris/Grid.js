import React from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';
import StyledGrid from '../styles/StyledGrid';

const Grid = ({ grid }) => (
  <StyledGrid width={grid[0].length} height={grid.length}>
    {grid.map(
      (line) => line.map((cell, x) => (
        <Cell
          key={x}
          type={cell[2] === 1 ? 'X' : cell[0]}
        />
      )),
    )}
  </StyledGrid>
);

Grid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.array)).isRequired,
};

export default Grid;
