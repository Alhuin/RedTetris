import React from 'react';
import PropTypes from 'prop-types';
import { StyledJoinButton } from '../styles/StyledJoinButton';

const JoinButton = ({ cb }) => (
  <StyledJoinButton onClick={cb}>
    Join room
  </StyledJoinButton>
);

JoinButton.propTypes = {
  cb: PropTypes.func,
};

JoinButton.defaultProps = {
  cb: () => console.log('JoinButton cb()'),
};

export default JoinButton;
