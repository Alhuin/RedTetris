import React from 'react';
import { StyledStartButton } from '../styles/StyledStartButton';

const StartButton = ({ cb }) => <StyledStartButton onClick={cb}>Start Solo</StyledStartButton>;

export default StartButton;
