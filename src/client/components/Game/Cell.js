import React from 'react';

import { StyledCell } from '../styles/StyledCell';
import { TETRIMINOS } from './tetriminos';

const Cell = ({ type }) => <StyledCell type={type} color={TETRIMINOS[type].color} />;

export default Cell;
