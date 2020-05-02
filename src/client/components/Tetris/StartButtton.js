import React from 'react';
import { StyledStartButton } from '../styles/StyledStartButton';

const StartButton = ({ mode, cb }) => (
  <StyledStartButton onClick={cb}>
    Start
    {mode}
  </StyledStartButton>
);

export default StartButton;
