import React from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';
import { StyledStage } from '../styles/StyledStage';

const Grid = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {stage.map(
      (line) => line.map((cell, x) => <Cell key={x} type={cell[0]} />),
    )}
  </StyledStage>
);

Grid.propTypes = {
  stage: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.array)).isRequired,
};

export default Grid;
