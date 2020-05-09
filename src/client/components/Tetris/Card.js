import React from 'react';
import PropTypes from 'prop-types';
import StyledDisplay from '../styles/StyledDisplay';

const Card = ({ gameOver, text }) => (
  <StyledDisplay gameOver={gameOver}>
    {text}
  </StyledDisplay>
);

Card.propTypes = {
  gameOver: PropTypes.bool,
  text: PropTypes.string,
};

Card.defaultProps = {
  gameOver: false,
  text: 'Info',
};

export default Card;
