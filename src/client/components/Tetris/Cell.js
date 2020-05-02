import React from 'react';
import PropTypes from 'prop-types';
import { StyledCell } from '../styles/StyledCell';
import { TETRIMINOS } from './tetriminos';

const Cell = ({ type }) => <StyledCell type={type} color={TETRIMINOS[type].color} />;

Cell.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Cell;
