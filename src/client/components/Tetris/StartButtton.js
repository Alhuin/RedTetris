import React from 'react';
import PropTypes from 'prop-types';
import { StyledStartButton } from '../styles/StyledStartButton';

const StartButton = ({ mode, cb }) => (
  <StyledStartButton onClick={cb}>
    Start
    {mode}
  </StyledStartButton>
);

StartButton.propTypes = {
  mode: PropTypes.string.isRequired,
  cb: PropTypes.func,
};

StartButton.defaultProps = {
  cb: () => console.log('StartButton cb()'),
};

export default StartButton;
