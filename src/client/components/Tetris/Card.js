import React from 'react';
import PropTypes from 'prop-types';
import StyledCard from '../styles/StyledCard';

const Card = ({ gameOver, text }) => (
  <StyledCard gameOver={gameOver}>
    {text}
  </StyledCard>
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
