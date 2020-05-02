import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectSocket } from '../../redux/selectors';
import { checkParams, checkRoomAvailable } from './helpers';

import CustomAlert from './Alert';
import JoinButton from './JoinButton';
import { StyledLogin, StyledLoginWrapper } from '../styles/StyledLogin';
import { StyledLogo } from '../styles/StyledLogo';

const Login = ({
  roomName, setRoomName, ready, setReady, username, setUsername,
}) => {
  const socket = useSelector(selectSocket);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  return (
    <StyledLoginWrapper>
      <StyledLogo />
      <StyledLogin>
        <input
          type="text"
          placeholder="Login"
          onChange={(e) => {
            setUsername(e.target.value);
            if (ready) {
              setReady(false);
            }
          }}
        />
        <input
          type="text"
          placeholder="Room name"
          onChange={(e) => {
            setRoomName(e.target.value);
            if (ready) {
              setReady(false);
            }
          }}
        />
      </StyledLogin>
      <JoinButton
        cb={() => {
          if (checkParams(roomName, username, setError)) {
            checkRoomAvailable(socket, roomName, username, setError, setReady, dispatch);
          }
        }}
      />
      { error !== ''
      && <CustomAlert severity="warning" message={error} close={() => setError('')} />}
    </StyledLoginWrapper>
  );
};

export default Login;
