import React from 'react';
import PropTypes from 'prop-types';
import { StyledDisplay } from '../styles/StyledDisplay';

const Display = ({ gameOver, text }) => (
  <StyledDisplay gameOver={gameOver}>
    {text}
  </StyledDisplay>
);

Display.propTypes = {
  gameOver: PropTypes.bool,
  text: PropTypes.string,
};

Display.defaultProps = {
  gameOver: false,
  text: 'Info',
};

export default Display;
