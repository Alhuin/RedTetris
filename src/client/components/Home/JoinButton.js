import React from 'react';
import { StyledJoinButton } from '../styles/StyledJoinButton';

const JoinButton = ({ cb }) => (
  <StyledJoinButton onClick={cb}>
    Join room
  </StyledJoinButton>
);

export default JoinButton;
