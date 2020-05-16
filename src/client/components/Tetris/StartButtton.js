import React from 'react';
import PropTypes from 'prop-types';
import StyledStartButton from '../styles/StyledStartButton';

const StartButton = ({ mode, cb }) => (
  <StyledStartButton type="button" onClick={cb}>
    Start
    {mode}
  </StyledStartButton>
);

StartButton.propTypes = {
  mode: PropTypes.string,
  cb: PropTypes.func,
};

StartButton.defaultProps = {
  mode: '',
  cb: () => console.log('StartButton cb()'),
};

export default StartButton;
